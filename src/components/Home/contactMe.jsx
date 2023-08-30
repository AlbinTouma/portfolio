"use client"
import Script from 'next/script';
import React from 'react';
import { InlineWidget } from "react-calendly";

// You can read more about Calendly documentation here https://www.npmjs.com/package/react-calendly

export default function Calendly() {

    return (


        <section id='Calendly' className='mt-11'>
            <div className='App'>
                <InlineWidget url='https://calendly.com/albin-touma/free-call' />
            </div>


        </section >
    )

}
