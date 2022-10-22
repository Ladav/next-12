import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'

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

export function getPostData(fileName: string) {
  const filePath = path.join(postDirectory, `${fileName}.md`)
  const fileContent = fs.readFileSync(filePath)
  const matterResult = matter(fileContent)

  return {
    ...(matterResult.data as { date: string; title: string }),
    content: matterResult.content,
  }
}
