import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    // get file name under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        // Remove .md from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const filecontents = fs.readFileSync(fullPath, 'utf-8')

        // use gray-matter to parse the post metadata section
        const matterResult = matter(filecontents)

        // combine the data with the id
        return {
            id,
            ...matterResult.data
        }
    })

    // sort post by date
    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    })
}