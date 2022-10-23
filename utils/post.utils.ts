import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postDirectory = path.join(process.cwd(), 'assets/post-md')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postDirectory)

  const posts = fileNames.map((fileName) => {
    const id = fileName.replace('.md', '')
    const filePath = path.join(postDirectory, fileName)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContent)

    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    }
  })

  return posts.sort(({ date: a }, { date: b }) => {
    if (a > b) return -1
    if (a < b) return 1
    return 0
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postDirectory)
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace('.md', ''),
    },
  }))
}

export async function getPostData(fileName: string) {
  const filePath = path.join(postDirectory, `${fileName}.md`)
  const fileContent = fs.readFileSync(filePath)
  const matterResult = matter(fileContent)
  // remarks take markdown and return parsed HTML
  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    ...(matterResult.data as { date: string; title: string }),
    contentHtml,
  }
}
