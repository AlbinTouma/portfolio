import { Image } from 'next/dist/client/image-component';
import OpenCorporates from '@/public/assets/OpenCorporates_Logo.png';
import ComplyAdvantage from '@/public/assets/ComplyAdvantage.svg';


export default function WorkedWith() {
    return (

        <>
            <section className='mt-[100px] mb-[100px] max-w-[768px] mx-auto'>
                <h1 className='text-4xl text-center font-bold text-emerald-900  mb-[100px]'>Brands I&apos;ve worked with</h1>
                <div className='flex-row flex flex-wrap justify-center gap-4'>
                    <Image src={ComplyAdvantage} width={250} height={300} alt='ComplyAdvantage' />
                    <Image src={OpenCorporates} width={300} height={300} alt='OpenCorporates' />
                </div>
            </section >
        </>
    )
}