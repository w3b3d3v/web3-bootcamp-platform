import { useState, useEffect } from 'react'
import { withProtected } from '../../hooks/route'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import { auth, storage } from '../../firebase/initFirebase'
import { lessonsStatus, lastLesson } from '../../lib/lessons'

function Stats() {
  const [lessonsStats, setLessonsStats] = useState([])
  const [lastLessons, setLastLessons] = useState([])

  useEffect(async () => {
    setLessonsStats(await lessonsStatus());
    setLastLessons(await lastLesson());
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
          <hr />
          <table>
            <thead>
              <tr>
                <td>Nome</td>
              </tr>
            </thead>
            <tbody>
              {lastLessons.map((l) => {
                return (
                  <tr key={l.id}>
                    <td className="mx-auto mb-1">{l.createdAt && new Date(l.createdAt.seconds * 1000).toLocaleString()}</td>
                    <td>{l.user.email}<br />{l.user.discord && l.user.discord.username}<br />{l.user.uid}</td>
                    <td></td>
                    <td></td>
                    <td><img src={l.content.value} /> </td>
                  </tr>
                )
              })}
            </tbody>

          </table>
        </div>
      </main>
    </Layout>
  )
}

export default withProtected(Stats)
