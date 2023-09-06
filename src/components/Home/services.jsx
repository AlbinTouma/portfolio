import { FaCheckCircle } from 'react-icons/fa'

const dictionary = {
    'From business request to solution':
        [' - Research that breaks down your regulatory landscape',
            '- Map and transform your datasets',
            '- Clean and organise your data',
            '- Analysis that uncovers hidden insights',],
    'Under the hood of anti-money laundering': ['- Regulatory research', '- Understand PEP, sanctions and corporate data'],
}

export function ServiceCard(props) {
    return (

        <>
            <li className=' p-4 w-full gap-2 flex-col flex flex-wrap  bg-slate-50 rounded-xl'>
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

export default function Services() {
    return (



        <ul className="flex mb-11 gap-4 flex-col p-3  mx-auto max-w-[768px]">

            <ServiceCard
                icon={<FaCheckCircle />}
                title='From business request to solution'
                checklist={dictionary['From business request to solution']}
            />

            <ServiceCard
                title='AML Subject Matter Expertise'
                icon={<FaCheckCircle />}
                checklist={dictionary['Under the hood of anti-money laundering']}
            />


        </ul>




    )
}
