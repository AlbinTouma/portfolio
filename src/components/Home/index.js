"use client"
import React, { useEffect, useState } from 'react';
import NavBar from '../Shared/NavBar';
import HeroBanner from './hero';
import Intro from './intro';
import Services from './services';
import Calendly from './contactMe';

export default function Home(props) {

    return (
        <>
            <NavBar />
            <HeroBanner />
            <Intro />
            <Services />
            <Calendly />


        </>



    )
}
