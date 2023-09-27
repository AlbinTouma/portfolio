"use client"
import Script from 'next/script';
import React from 'react';
import { InlineWidget } from "react-calendly";

// You can read more about Calendly documentation here https://www.npmjs.com/package/react-calendly

export default function Calendly() {

    return (

        <>
            <div className='max-w-[768px] mx-auto text-center'>
                <h1 className='text-6xl mb-4 text-emerald-900 font-semibold'>Book a free call</h1>
                <p className='text-3xl text-emerald-900'>Let&apos; talk about your project. <br></br> Prefer email? Find me at albin.touma@gmail.com</p>
            </div>

            <section id='Calendly' className='mt-11'>
                <div className='App'>
                    <InlineWidget url='https://calendly.com/albin-touma/free-call' />
                </div>


            </section >
        </>
    )

}
