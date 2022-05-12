import { useState, useEffect } from 'react'
import { withProtected } from '../../hooks/route'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import { auth, storage } from '../../firebase/initFirebase'
import { lessonsStatus } from '../../lib/lessons'

function Stats() {
  const [lessonsStats, setLessonsStats] = useState([])

  useEffect(async () => {
    setLessonsStats(await lessonsStatus());
  }, []);

  return (
    <Layout>
      <Head>
        <title>Lessons Stats - Bootcamp Web3Dev</title>
      </Head>
      <main className="container mx-auto mt-16 px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0">
        <div className=" mb-3 mt-6 bg-white-100 p-3 dark:bg-black-200">
          <ul>
            {lessonsStats
              .map((l) => {
                return (
                  <li key={l.session}>
                    {l.session} => {l.submitted}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </main>
    </Layout>
  )
}

export default withProtected(Stats)
