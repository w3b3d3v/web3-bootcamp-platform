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

export async function getHomeCourse() {
  const q = query(collection(db, 'courses'), where('home', '==', true));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docSnapshot = querySnapshot.docs[0];
    const course = { id: docSnapshot.id, ...docSnapshot.data() };
    return course;
  }
  return null;
}

