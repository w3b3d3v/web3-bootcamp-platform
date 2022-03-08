import Head from 'next/head'
import Link from 'next/link'
import Button from '../components/Button'
import Layout from '../components/layout'
import useAuth from '../hooks/useAuth'

export default function Home() {
  const { user } = useAuth()

  return (
    <Layout>
      <Head>
        <title>web3dev Bootcamp Platform</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <div className="container relative mx-auto items-center gap-8 px-6 sm:px-6 md:flex md:px-6 lg:px-32 py-6">
          <div className="text-color w-full pt-16 md:w-1/3 lg:pt-32 xl:pt-12">
            <h1 className="f-f-l w-11/12 text-4xl font-extrabold text-gray-900 md:text-4xl lg:w-11/12 lg:text-6xl xl:w-full xl:text-6xl">
              Build with us
            </h1>
            <Button>teste eee</Button>

            <div className="f-f-r pb-20 pt-10 text-base sm:pb-0 lg:text-base xl:pt-6">
              <h2>Lorem impsum</h2>
            </div>
            <div className="lg:flex">
              <a>
                <button className="f-f-r text-white mt-4 hidden w-full rounded-lg bg-indigo-700 py-4 text-base font-bold hover:opacity-90  focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2 md:block xl:mt-8 xl:w-6/12 xl:text-base">
                  Start building now
                </button>
              </a>

              <button className="f-f-r mt-4 hidden w-full rounded-lg bg-indigo-200 py-4 text-base font-medium text-indigo-600 hover:opacity-90 focus:outline-none focus:ring-2  focus:ring-indigo-700 focus:ring-offset-2 md:block lg:ml-2 xl:ml-2 xl:mt-8 xl:w-4/12 xl:text-base">
                Try it out
              </button>
            </div>
          </div>
          <img
            className="mt-8 w-full object-fill md:mt-0 md:-ml-4 md:w-2/3 lg:-ml-4 xl:ml-0"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/Graphic.png"
            alt="sample page"
            role="img"
          />
          <button className="f-f-r text-white mt-4 w-full rounded-lg bg-indigo-700 py-4 text-base font-bold hover:opacity-90  focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2 md:hidden xl:mt-8 xl:w-6/12 xl:text-base">
            Start building now
          </button>
          <button className="f-f-r mt-4 w-full rounded-lg bg-indigo-200 py-4 text-base font-medium text-indigo-600 hover:opacity-90 focus:outline-none  focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2 md:hidden xl:ml-2 xl:mt-8 xl:w-4/12 xl:text-base">
            Try it out
          </button>
        </div>
      </main>
    </Layout>
  )
}
