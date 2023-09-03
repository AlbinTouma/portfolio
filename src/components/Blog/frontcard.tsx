import Link from 'next/link';
import getPostMetaData from './getPostMetadata';


export default function BlogPreview() {
    const postMetaData = getPostMetaData();
    const postPreviews = postMetaData.map((post) => (
        <>
            <Link href={`/posts/${post.slug}`} >
                <h2 className='text-3xl'>{post.title}</h2>
                <p>{post.date}</p>
            </Link>
        </>
    ))
    return (

        <section className='mb-200px] mt-[200px] h-screen max-width-[768px] mx-auto'>
            <div>{postPreviews}</div>
        </section>
    );

}
