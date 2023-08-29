"use client"
import TextLoader from '../Shared/TextLoader';
import React, { useEffect, useState } from 'react';


const Intro = () => {
    const [content, setContent] = useState('');
    useEffect(() => {
        // Fetch content from a text or markdown file
        const filePath = '/about.md';

        fetch(filePath)
            .then((response) => response.text())
            .then((content) => setContent(content))
            .catch((error) => console.error('Error fetching content:', error));
    }, []);

    return (
        <div className='mx-auto p-2 sm:p-1 md:p-0 max-w-[769px] mt-11'>
            <TextLoader content={content} />
        </div>
    );
};

export default Intro;