import type { GetStaticPathsResult, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/layout'
import { getAllPostIds, getPostData } from '../../utils/post.utils'

export type FirstPostProps = {
  post: ReturnType<typeof getPostData>
}

export default function FirstPost({ post }: FirstPostProps) {
  return (
    <Layout>
      <Head>
        <title>first post</title>
      </Head>
      <h1 className="mb-1 text-4xl font-bold text-teal-500">{post.title}</h1>
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold">{post.date}</span>
        <Link href="/">&lt;- Way Back Home</Link>
      </div>
      <main className="pt-8">
        <p className="italic">{post.content}</p>
      </main>
    </Layout>
  )
}

export function getStaticPaths(): GetStaticPathsResult {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export function getStaticProps({ params }: GetStaticPropsContext) {
  if (typeof params?.id !== 'string') {
    return {
      notFound: true,
    }
  }

  const postData = getPostData(params.id)
  return {
    props: {
      post: { ...postData },
    },
  }
}
