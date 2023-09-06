import { useState, useEffect } from 'react'
import { withProtected } from '../../hooks/route'
import Head from 'next/head'
import Link from 'next/link'
import { auth, storage } from '../../firebase/initFirebase'
import { lessonsStatus, lastLesson } from '../../lib/lessons'

function Stats() {
  const [lessonsStats, setLessonsStats] = useState([])
  const [lastLessons, setLastLessons] = useState([])

  useEffect(async () => {
    setLessonsStats(await lessonsStatus())
    setLastLessons(await lastLesson())
  }, [])

  return (
    <>
      <Head>
        <title>Lessons Stats - WEB3DEV</title>
      </Head>
      <main className="container mx-auto mt-16 px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0">
        <div className=" mb-3 mt-6 bg-white-100 p-3 dark:bg-black-200">
          <ul>
            {lessonsStats.map((l) => {
              return (
                <li key={l.session}>
                  {l.session} => {l.submitted}
                </li>
              )
            })}
          </ul>
          <hr />
          <div className="table-fixed">
            <div className="max-w-4/5">
              {lastLessons.map((l) => {
                return (
                  <div key={l.id}>
                    <div className="fl mx-auto mb-1">
                      {l.createdAt && new Date(l.createdAt.seconds * 1000).toLocaleString()}
                    </div>
                    <div>
                      {l.user.email}
                      <br />
                      {l.user.discord && l.user.discord.username}
                      <br />
                      {l.user.uid}
                    </div>
                    <div className="max-h-60">
                      <img className="max-h-60 object-cover" src={l.content.value} />{' '}
                    </div>
                    <hr />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default withProtected(Stats)
