import fs from 'fs';
import Markdown from 'markdown-to-jsx'
import matter from 'gray-matter'
import getPostMetaData from '@/src/components/Blog/getPostMetadata';
import { Image } from 'next/dist/client/image-component';
import NavBar from '@/src/components/Shared/NavBar';
import { FaArrowLeft } from 'react-icons/fa'

const getPostContent = (slug: string) => {
    const folder = 'posts/'
    const file = `${folder}${slug}md`
    const content = fs.readFileSync(file, "utf8")
    const matterResult = matter(content);
    return matterResult
}

export const generatedStaticParams = async () => {
    const posts = getPostMetaData()
    return posts.map((post) => {
        slug: post.slug
    });
}

const BlogPage = (props: any) => {
    const slug = props.params.slug;
    const post = getPostContent(slug)
    return (
        <>
            <header className='mb-[100px] mt-11 mr-11 flex justify-end'>

                <a href='/'>
                    <button className='flex flex-row gap-2 items-center'>
                        <FaArrowLeft />
                        Go home
                    </button>
                </a>
            </header>
            <section className='max-w-[768px] mx-auto'>
                <h1 className='text-5xl mb-11 text-emerald-900'>{post.data.title}</h1>
                <Image src={post.data.image} width={768} height={500} alt='blog cover' />
                <Markdown className='markdown prose-h1:text-4xl prose-p:text-2xl prose-p:text-gray-600 prose-h1:text-emerald-900'>{post.content}</Markdown>
            </section>
        </>
    )




}
export default BlogPage