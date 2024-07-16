import { db } from '../firebase/initFirebase.js'
import { doc, getDoc } from 'firebase/firestore'
import { branch, user, repo, lastCommitId } from './utils/github.js'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { useTranslation } from 'react-i18next'

const fetch = require('node-fetch')

export async function getPage(course, section, lesson, language) {
  const commit = await lastCommitId(user, repo, branch)
  const url = `https://cdn.rawgit.com/${user}/${repo}/${commit}/${course}/${language}/${section}/${lesson}`
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

  return lessons
}

export async function getStudyGroup(groupSlug) {
  const colRef = collection(db, 'study_groups')
  const q = query(colRef, where('slug', '==', groupSlug))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    throw new Error('Study group not found!')
  }

  const groupDoc = querySnapshot.docs[0]
  const group = {
    id: groupDoc.id,
    ...groupDoc.data(),
    scheduled_at: groupDoc.data().scheduled_at.toDate().toISOString(), // Convert Timestamp to Date
  }
  return { ...group }
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
  title: 'Crie seu Primeiro Smart Contract com Solidity',
  description:
    'Um projeto de nove dias onde você irá aprender Solidity, escrever e implementar smart-contracts na blockchain e desenvolver um Web3 App para interagir com seu contrato. Perfeito para entusiastas em blockchain e desenvolvedores de Web3.',
  image_url:
    'https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2FSolana_NFTs.png?alt=media&token=fcdba884-7e66-46b8-9282-fced339907da',
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

export function getFieldContent(object, field, i18n) {
  let content

  if (object?.metadata) {
    content = object.metadata[i18n.resolvedLanguage || 'en']?.[field]
  } else {
    content = object?.[field]
  }

  return content || ''
}
