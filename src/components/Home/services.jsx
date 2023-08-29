import {FaCheckCircle} from 'react-icons/fa'

const dictionary = {
    'From business request to solution': ['- Research that breaks down your regulatory landscape', 'Deliver', 'Regulations'],
    'Data Analysis': ['Clean', 'Analyse'],
    'Data Cleaning': ['Cleaning', 'Organising'],
}

export function ServiceCard(props){
    return(

    <>
    <li className=' p-4 w-full gap-2 flex-col flex  bg-slate-50 rounded-xl'>
        <div className='flex flex-row gap-2 items-center'>
            <div className='text-xl text-green-500'>{props.icon}</div>
            <h1 className='text-xl'> {props.title}</h1>
        </div>
        <div>            
            {props.checklist.map((item, index) =>
            <p key={index}>{item}</p>
            )}
        </div>

        </li>
    </>
    )
}

export default function Services(){
    return(



    <ul className="flex mb-11 gap-4 flex-col mx-auto max-w-[768px]">

    <ServiceCard 
            icon={<FaCheckCircle/> }
            title='From business request to solution'
            checklist={dictionary['From business request to solution']} 
            />

           <ServiceCard 
            icon={<FaCheckCircle/> }
            title='Data Analysis' 
            checklist={dictionary['Data Analysis']}
            />

      
            
    </ul>

  

        
    )
}
