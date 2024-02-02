import { db } from '../firebase/initFirebase.js'
import { doc, getDoc } from 'firebase/firestore'
import { branch, user, repo, lastCommitId } from './utils/github.js'
import { collection, query, getDocs, where } from 'firebase/firestore'
const fetch = require('node-fetch')

async function getPage(course, section, page) {
  const commit = await lastCommitId(user, repo, branch)
  const url = `https://cdn.rawgit.com/${user}/${repo}/${commit}/${course.id}/${course?.repository_language}/${section}/${page}`
  const result = await fetch(url)
  const text = await result.text()
  return text
}

async function getCourseLessons(course) {
  if (course == undefined || course.sections == undefined) return []
  let lessons = Object.keys(course.sections)
    .map((section) => {
      return course.sections[section].map((lesson) => {
        lesson = lesson.file
        return {
          section,
          lesson,
        }
      })
    })
    .flat()

  return await Promise.all(
    lessons.map(async (l) => {
      return { ...l, markdown: await getPage(course, l.section, l.lesson) }
    })
  )
}

export async function getCourse(course_id) {
  const docRef = doc(db, 'courses', course_id)
  const courseDoc = await getDoc(docRef)
  const course = { id: course_id, ...courseDoc.data() }
  const lessons = await getCourseLessons(course)
  return { ...course, lessons }
}

export const defaultCourse = {
  id: 'Solidity_And_Smart_Contracts',
  title: 'Crie seu próprio mini-jogo NFT de turnos',
  description:
    'Um projeto para desenvolvedores curiosos que desejam aprender mais sobre a união entre criptomoedas e jogos fazendo o seu próprio jogo web3. Você irá mintar seus próprios NFTs, fazer personagens jogáveis com os NFTs que você mintou e permitir que usuários ganhem suas próprias criptomoedas conforme eles jogam o seu jogo!',
  image_url:
    'https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2FNFT_Game.png?alt=media&token=cda3e2bc-1b1d-4245-a19d-2a0088688049',
}

export async function getHomeCourse() {
  const q = query(collection(db, 'courses'), where('home', '==', true))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    const docSnapshot = querySnapshot.docs[0]
    const course = { id: docSnapshot.id, ...docSnapshot.data() }
    return course
  }
  return defaultCourse
}

