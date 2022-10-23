import type { GetStaticPathsResult, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Date from '../../components/date/date'
import Layout from '../../components/layout/layout'
import { getAllPostIds, getPostData } from '../../utils/post.utils'

export type FirstPostProps = {
  post: Awaited<ReturnType<typeof getPostData>>
}

export default function FirstPost({ post }: FirstPostProps) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1 className="mb-1 text-4xl font-bold text-teal-500">{post.title}</h1>
      <div className="flex items-center justify-between">
        <Date dateString={post.date} className="text-base font-semibold text-gray-500" />
        <Link href="/">&lt;- Way Back Home</Link>
      </div>
      <main className="pt-8">
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
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

export async function getStaticProps({ params }: GetStaticPropsContext) {
  if (typeof params?.id !== 'string') {
    return {
      notFound: true,
    }
  }

  const postData = await getPostData(params.id)
  return {
    props: {
      post: { ...postData },
    },
  }
}
