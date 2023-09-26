---
title: 'Automate Excel with Python'
subtitle: 'My First blog of 2022'
explanation: 'Knowing about new data before that first coffee with a client can mean the difference between a deal and no deal. With Python, I reduced the time to update sales from a day to less than the time it takes them to finish their coffee. '
image: '/assets/python_code.jpg'
date: '2023-09-26'
---

# Business Problem.

As an analyst I recieve monthly excel sheets from our data vendor that describes their data coverage. My job is to analyse changes in their coverage. This usually takes about a day to do, so I decided to save myself the effort with a python programme that lets anyone in the company complete this task. 

Every project needs a good definition of done, and I was able to find a good definition by thinking about what I wanted the user to achieve: 

>"..the user should load the file, run the programme, and then see a heatmap of our vendor's data coverage and a list of changes in coverage compared to last month's file."

Done is then when the python programme:

1) Scores the input coverage Excel sheet and saves the output as a heatmap
2) Compares the heatmap to the previous month's heatmap and logs any differences

### How Excel let us down

Picture this: each month, the data vendor sends you a file of their current data coverage. Our product is based on this data, so it's crucial that engineers, sales, and product owners know about any updates with speed and high accuracy. 

Knowing about our new officer data in France before that morning coffee with a potential client can really be the difference between deal and no deal, and with Excel, we risked no deal. 

The reason why is because the task of manually scoring and comparing files was too tedious. Not only that, Excel would often crash.

Scoring the sheets required long if statements and XLOOKUP formulas that often broke down when trying to transfer scores from the data vendor's list of countries and states to our internal list of all the world's countries and states.

If that doesn't sound bad, wait until you hear about the next step. To find changes, you had to copy the last months' results and paste it into this months' sheet. Then, you had to compare cells to identify differences before filtering booleans to find changes. Not only was this prone to human error, there was never the time to compare multiple months at once. 

As soon as you tried lookups or any other solution in to speed up the process, Excel would simply crash. 

With Python, I increased the efficiency and accuracy of comparing our data vendor's coverage sheets and transformed the process from a complicated set of tasks to a programme that anyone in the company can run with a simply 'python main.py' in the command line. 




# Python Solution

The structure of the programme is simple. We have three directories. One folder where we store our scripts, a *data input* folder for the Excel files from our data vendor, and an *output folder* where we store the scored Excel files and our changes log. 

The a main.py file runs each task of our programme. Each task is its own python file. This helps us break down different problems and keep our code organised.

Our main.py loads both the Excel files from our data vendor and the processed files in order to score and compare sheets. 

```py
main.py

# Load Excel files from input directory and load output_files
input_files = [f for f in os.listdir(input_directory) if f.endswith('.xlsx')]
output_files = [f for f in os.listdir(
    output_coverage_sheets_directory) if f.endswith('.xlsx')]

```

## Objective 1: Score Excel files and save output

Cleaning and scoring the vendor's data files is our first step. Our for loop applies the different steps in the process to each file. 

```py
main.py

# Loop through the input directory and score each OC coverage sheet.
for input_file in input_files:
    input_file_path = os.path.join(input_directory, input_file)
    data = load_input(input_file_path)
    file_date = extract_date(input_file_path) 
    oc_coverage(data, file_date)
```
### 1) Load data

The loop begins by saving the path of each file and passing the path to our load_data function. 

```py
load_files.py

def load_input(file_path):
    data = pd.read_excel(file_path, sheet_name='Coverage Overview', skiprows=3)
    return data
```

### 2) Extract date

After loading the data, we extract the date when the file was last updated by the vendor so that we can organise the Excel sheets and identify any changes in their data. 

We find when the last file was last updated at C2. To extract this date,  we call  the extract_date function.

```py
file_date.py

def extract_date(file_path):
    workbook = load_workbook(filename=file_path)
    sheet = workbook['Coverage Overview']
    date = sheet['C1'].value
    date = datetime.strptime(date, "%dth %B %Y")
    date = date.strftime("%dth-%B-%Y")
 
    return date

```

The extract_date function loads the workbook and sheet where the date is found and saves the date as dd-mm-yy. 

### 3) Score Excel Sheet

Now that we've extracted both the data and the last updated date, we can call the oc_coverage function. This function cleans, scores, and saves the output of the Excel files as heatmaps organised by month in the output folder. 

We first remove unwanted columns; these are the blank columns containing Unnamed. Columns refering to the freshness of data is converted by mapping the categorical data to corresponding values in our freshness_dictionary. We keep a copy of this dictionary in our lookup folder where we also keep a list of all of the states and countries in the world.

The next step is to score the data. We assign 10 where there is firmographic and officer data and 0 where no data exists. The result is a dataframe with converted freshness and scores showing the states and countries where our vendor has firmograhpic and officer data.

Once scored, we import our csv with the world's countries and states and perform an outer merge on our data frame and fill na values with 0. 

```py

def oc_coverage(data, date):

    date = date
    # Import data & remove empty columns
    data = data.loc[:, ~data.columns.str.contains('Unnamed')]
    data = data.copy()

   # Convert freshness columns to integers
    for col in ['Cadence (Updated to OC)', 'Cadence (Incorporation to OC Entry)']:
        data[col] = data[col].map(freshness_dictionary)

    # Compute and map freshness id to Freshness dictionary
    data.loc[:, 'Freshness'] = data.apply(lambda row: (
        row['Cadence (Incorporation to OC Entry)'] + row['Cadence (Updated to OC)']) / 2, axis=1).round(0)
    data.loc[:, 'Freshness'] = data['Freshness'].map(
        {v: k for k, v in freshness_dictionary.items()})

    # Score firmographic and officer
    data.loc[:, 'Firmographic'] = data.apply(
        lambda row: 10 if row['Legal name'] == 1 else 0, axis=1)
    data.loc[:, 'Officer'] = data.apply(
        lambda row: 0 if row['Officer Count'] == 'No Officers' else 10, axis=1)

    # Select only the relevant columns
    data = data[['Jurisdiction', 'Freshness', 'Firmographic', 'Officer']]
    data = data

    # Import jurisdictions lookup table and merge data with lookup table
    jurisdiction_table = pd.read_csv(
        'scripts/lookup/template_jurisdictions.csv')
    oc_coverage = data.merge(
        jurisdiction_table, how='outer', on='Jurisdiction')

    # Assign na values for fresshness, officer, and firmographics
    oc_coverage['Freshness'] = oc_coverage['Freshness'].apply(
        lambda value: 'Not Covered' if pd.isna(value) else value)
    oc_coverage[['Firmographic', 'Officer']] = oc_coverage[[
        'Firmographic', 'Officer']].fillna(0)

    # Export coverage sheet as excel file and append date of file to the name. 
    excel_file_path = f'./output/coverage_sheets/{date}.xlsx'
    oc_coverage.to_excel(excel_file_path, index=False)

```

The result of merging the data frames is a heatmap of the countries in the world where our data vendor has data. We then save this heatmap in our output directory and append the date when the file was last updated to the name of the file. 

Inscoring the Excel sheets, we've loaded the data, extracted the date, scored the files and saved the output of each file as heatmaps that can be organised by the date when they were last updated. This completes the first task of the programme. 

The next step is to let the user compare different months and see the latest changes in our vendor's data. 

## Objective 2: Compare files and write changes to a log

The second step is to compare the heatmaps and identify any differences between the latest update from our data vendor and last month's file. In our main.py file, we loop through our heatmaps stored in our output directory. 

The loop below loads the output files and adds the date when they were last updated as a column to each file before appending the files to a list. 

```py
files = []
merged_data = pd.DataFrame()
# Loop through the output directory to compare each OC coverage sheet
for output_file in output_files:
    output_file_path = os.path.join(
        output_coverage_sheets_directory, output_file)
    output_data = load_output(output_file_path)
    output_data = add_date_columns(output_file, output_data)
    files.append(output_data)

merged_data = merge_dfs(files)
change_log(merged_data)

```

The heatmap files no longer have cell C3 where the date used to be, so we extract it from the name of the file instead by calling the add_date_columns function. 

```py
file_date.py

#Takes the date in the heatmap filename and populates a column in heatmap with this date. 
def add_date_columns(output_file, output_data):
    filename_date_str = output_file
    filename_date = parser.parse(filename_date_str, fuzzy=True)
    month_name = filename_date.strftime('%b')
    output_data['Date'] = month_name
    return output_data


```
The add_date_columns function takes the date in the heatmap's filename and uses the date to populate a column in the heatmap. This is useful because we'll merge the files to create a big datafraem and the dates will act as a unique identifier. 

The main.py then passes the list of files to our merger function, which essentially selects relevant columns and performs an outer merge on those columns. 

```py
merge.py

#Merge all of the OC heatmaps
def merge_dfs(files):
    merge_columns = ['Jurisdiction', 'Country', 'Firmographic', 'Officer',
                     'Freshness', 'Category', 'ISO_2', 'iso_2', 'Region', 'Date']
    
    merged_data = reduce(lambda left, right: pd.merge(
        left, right, on=merge_columns, how='outer'), files)

    return merged_data

```

With the returned dataframe called merged_data, we can call our function change_log in main.py to compare heatmaps and register changes in a log. 

### Compare files and log changes

The change_log function compares the different heatmaps and logs changes by month and in a mster_change log that contains changes across all months. 



The function starts by creating a pivot table from the merged data frames. It then pivots the table by date. The result is a multi-indexed dataframe with hierarchical data. 


We then create variables to compare the months; column 0 is always the value of the latest month and column 1 is the value of the second month we want to compare. 

With these variables, we can compare the months. If it is true that firmographic 1 is the same as firmographi2, then True is inserted into the no change column. The same goes for all columns.

```py
scoring_data.py
def change_log(merged_df):
    change_log = pd.pivot_table(merged_df, index=[
                                'Jurisdiction', 'Date', 'Freshness', 'Firmographic', 'Officer']).reset_index()

    change_log = change_log.pivot(index='Jurisdiction', columns='Date', values=[
                                  'Firmographic', 'Officer', 'Freshness'])

    firmographic1 = change_log['Firmographic'].columns[0]
    firmographic2 = change_log['Firmographic'].columns[1]
    officer1 = change_log['Officer'].columns[0]
    officer2 = change_log['Officer'].columns[1]
    freshness1 = change_log['Freshness'].columns[0]
    freshness2 = change_log['Freshness'].columns[1]

# Take the first column in Firmographics and compare it to the second.
    change_log[('No Change', 'Firmographics')] = (change_log[(
        'Firmographic', firmographic1)] == change_log[('Firmographic', firmographic2)])
    change_log[('No Change', 'Officer')] = (
        change_log[('Officer', officer1)] == change_log[('Officer', officer2)])
    change_log[('No Change', 'Freshness')] = (
        change_log[('Freshness', freshness1)] == change_log[('Freshness', freshness2)])

    change_log.to_excel('./output/change_log/master_change_log.xlsx')

    filter_mask = (

        ~change_log[("No Change", "Firmographics")] |
        ~change_log[("No Change", "Officer")] |
        ~change_log[("No Change", "Freshness")]
    )

    changes = change_log[filter_mask]

    changes_cols = [
        ('Firmographic', changes['Firmographic'].columns[0]),
        ('Firmographic', changes['Firmographic'].columns[2]),
        ('Officer', changes['Officer'].columns[0]),
        ('Officer', changes['Officer'].columns[2]),
        ('Freshness', changes['Freshness'].columns[0]),
        ('Freshness', changes['Freshness'].columns[2])
    ]
    filtered_changes = changes[changes_cols]
    today_date = datetime.datetime.now().strftime('%Y-%m-%d')
    if filtered_changes.empty:
        filtered_changes.to_excel(f'./output/change_log/{today_date}_log.xlsx')
        print('No jurisdictions with changes found')
    else:
        print('Rows with changes')
        filtered_changes.to_excel(f'./output/change_log/{today_date}_log.xlsx')



```

Once we have booleans to demarkate where there's been a change in value between different months, we save the output to a master_change_log. This file is updated everytime we run the programme and it contains all the months. Each month when we get a new file from our vendor and run the script, the month will be repesented in a column on this log. 

The master_change log is helpful for viewing change overtime, but what if we want a quick update that highligths the latest changes so we can tell the team and key stakeholders? 

To achieve this, we create a mask that lets us filter rows where there's been a change. This narrows our dataframe down to a short table that we save as an Excel file. 

If there's been no changes, that is, if the dataframe is empty, we'll print a statement that says that there's been no changes. However, if there's been a change, we'll save the filtered dataframe with the changes. 

To stay organised, we'll save each change_log with today's date appended to the end.  


## From business problem to solution

I  said earlier that  'knowing about updates in our data before that morning coffee with a potential client can be the difference between deal and no deal'. 

With this Python programme, I can now update our sales team about changes in our data in less than the time it takes them to finish their coffee. 