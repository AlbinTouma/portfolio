import Link from 'next/link';
import getPostMetaData from './getPostMetadata';
import { Image } from 'next/dist/client/image-component';
import { PostMetaData } from './models';

const BlogPreview = (props: PostMetaData) => {
    return (

        <div className='border border-slate-300 p-4 rounded-md shadow-sm'>
            <Link href={`/posts/${props.slug}`} >
                <p className='text-sm'>{props.date}</p>
                <h2 className='text-2xl text-emerald-900 font-semibold hover:underline mb-4'>{props.title}</h2>
                <p className='text-slate-700'>{props.explanation}</p>
            </Link>
        </div>

    )

}
export default BlogPreview
