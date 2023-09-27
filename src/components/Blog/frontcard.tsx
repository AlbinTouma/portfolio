import Link from 'next/link';
import getPostMetaData from './getPostMetadata';
import { Image } from 'next/dist/client/image-component';

export default function BlogPreview() {
    const postMetaData = getPostMetaData();
    const postPreviews = postMetaData.map((post) => (

        <div className='m-4 pl-3 pr-4 pb-1 w-[600px]'>
            <Link href={`/posts/${post.slug}`} >
                <Image className='items-center mb-4 rounded-xl aspect-w-16 aspect-h-9' src={post.image} width={500} height={300} alt='test' />
                <h2 className='text-2xl'>{post.title}</h2>
                <p className='mb-2 text-gray-500'>{post.date}</p>
                <p className='text-gray-500 text-xl'>{post.explanation}</p>
            </Link>
        </div>

    ))
    return (
        <>
            <section className='mb-[200px] mt-[200px] p-11'>
                <div className='mx-auto max-w-screen-xl bg-blue-50 pt-4 rounded-3xl pb-11'>
                    <h1 className='text-4xl sm:text-6xl font-semibold mb-11 max-w-[900px] text-emerald-900 p-11'>From business problem to insightful solution</h1>
                    <div className='flex flex-row gap-4 flex-wrap'>{postPreviews}</div>
                </div>
            </section >

        </>
    );

}
