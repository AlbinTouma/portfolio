import fs from 'fs';
import Markdown from 'markdown-to-jsx'
import matter from 'gray-matter'
import getPostMetaData from '@/src/components/Blog/getPostMetadata';

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
        <>  <h1>{post.data.title}</h1>
            <Markdown>{post.content}</Markdown>
        </>
    )



}
export default BlogPage