import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import Markdown from 'react-markdown';


const TextLoader = ({ content }) => {
    return (
        <>
            <ReactMarkdown className='markdown prose-h1:text-4xl prose-h1:text-emerald-900'>
                {content}
            </ReactMarkdown>

        </>
    )
}

export default TextLoader;
