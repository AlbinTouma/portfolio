import { Image } from 'next/dist/client/image-component';
import OpenCorporates from '@/public/assets/OpenCorporates_Logo.png';
import ComplyAdvantage from '@/public/assets/ComplyAdvantage.svg';


export default function WorkedWith() {
    return (

        <>
            <h1 className='text-4xl mb-11 text-emerald-900 font-semibold text-center'>Brands worked with</h1>
            <section className=' max-width-[768px] mx-auto flex flex-row flex-wrap justify-center'>
                <Image src={ComplyAdvantage} width={300} height={300} alt='ComplyAdvantage' />
                <Image src={OpenCorporates} width={300} height={300} alt='OpenCorporates' />
            </section >
        </>
    )
}