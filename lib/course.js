import { db } from '../firebase/initFirebase.js'
import { doc, getDoc } from 'firebase/firestore'
import { branch, user, repo, lastCommitId } from './utils/github.js'
import { collection, query, getDocs, where } from 'firebase/firestore'
const fetch = require('node-fetch')

async function getPage(course, section, page) {
  const commit = await lastCommitId(user, repo, branch)
  const url = `https://cdn.rawgit.com/${user}/${repo}/${commit}/${course.id}/${course.repository_language}/${section}/${page}`
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

async function getCourseById(db, courseId) {
  const docRef = doc(db, 'courses', courseId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Course not found!");
  }

  const data = { id: docSnap.id, ...docSnap.data() };

  const lessons = await getCourseLessons(data);
  return { ...data, lessons };
}

async function getGroupBySlug(db, groupSlug) {
  const colRef = collection(db, 'study_groups');
  const q = query(colRef, where('slug', '==', groupSlug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("Group not found!");
  }

  const docSnap = querySnapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
}

const kindToFunctionMap = {
  course: getCourseById,
  group: getGroupBySlug
};

export async function getCourse(kind, identifier) {
  const getFunction = kindToFunctionMap[kind];
  if (!getFunction) {
    throw new Error("Invalid kind specified");
  }
  return await getFunction(db, identifier);
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

