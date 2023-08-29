"use client"
import React, { useEffect, useState } from 'react';
import NavBar from '../Shared/NavBar';
import HeroBanner from './hero';
import Intro from './intro';
import Services from './services';

export default function Home() {

    return (
        <>
            <NavBar />
            <HeroBanner />
            <Intro />
            <Services/>


        </>



    )
}
