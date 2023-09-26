"use client"
import Image from "next/image";
import Profile from '../../../public/profile.jpg';

export default function HeroBanner() {
    return (
        <section className="h-screen sm:h-[600px] bg-gradient-to-b from-emerald-900 to-emerald-600 items-center  flex p-11">
            <div className="text-lime-100 mx-auto max-w-[1000px] flex flex-col md:flex-row items-center gap-4">
                <div>
                    <h1 className="text-5xl font-semibold">From business problem to data driven solution</h1>
                    <p className="text-xl pt-4"> Researcher and data analyst with 2 years of experience under the hood of anti-money laundering</p>
                </div>
                <Image src={Profile} alt="Profile of Albin" />


            </div>
        </section>
    )
} 