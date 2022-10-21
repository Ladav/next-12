import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/layout'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>first post</title>
      </Head>
      <h1 className="text-gray-500">Hi world</h1>
      <h1>
        <Link href="/">Go Back </Link>
      </h1>
    </Layout>
  )
}
