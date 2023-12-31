import fs from 'fs'
import matter from "gray-matter";
import { PostMetaData } from "@/src/components/Blog/models.js";


const getPostMetaData = (): PostMetaData[] => {
    const folder = 'posts'
    const files = fs.readdirSync(folder)
    const markdownPosts = files.filter((file) => file.endsWith('.md'))


    const posts = markdownPosts.map((fileName) => {
        const fileContents = fs.readFileSync(`posts/${fileName}`, "utf-8")
        const matterResult = matter(fileContents)
        return {
            title: matterResult.data.title,
            explanation: matterResult.data.explanation,
            date: matterResult.data.date,
            image: matterResult.data.image,
            subtitle: matterResult.data.subtitle,
            slug: fileName.replace('md', ""),
        }
    })

    return posts;

};
export default getPostMetaData
