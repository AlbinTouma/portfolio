import Image from "next/image";
import Profile from '../../../public/profile.jpg';

export default function HeroBanner() {
    return (
        <section className="h-[600px] bg-gradient-to-b from-emerald-900 to-emerald-600 items-center  flex p-11">
            <div className="text-lime-100 mx-auto max-w-[1000px] flex flex-col md:flex-row items-center gap-4">
                <div>
                    <h1 className="text-4xl">From problem to data driven solutions</h1>
                    <p className="text-xl pt-4"> Experience under the hood of compliance</p>
                </div>
                <Image src={Profile} alt="Profile of Albin" />


            </div>
        </section>
    )
} 