import { db } from '../firebase/initFirebase.js'
import { doc, getDoc } from 'firebase/firestore'
import { branch, user, repo, lastCommitId } from './utils/github.js'

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
