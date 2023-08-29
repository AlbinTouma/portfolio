"use client"
import TextLoader from '../shared/TextLoader';
import React, { useEffect, useState } from 'react';
import remark from 'remark'
import html from 'remark-html'

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
        <div className='mx-auto max-w-[769px] mt-11'>
            <TextLoader content={content} />
        </div>
    );
};

export default Intro;