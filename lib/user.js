import { db } from '../firebase/initFirebase.js'
import {
  doc,
  query,
  getDoc,
  onSnapshot,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
  addDoc
} from 'firebase/firestore'

const collectionRef = collection(db, 'users')
const cohortsRef = collection(db, 'cohorts')

export const getUserFromFirestore = async (userCredential) => {
  const docRef = doc(collectionRef, userCredential?.uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const userData = docSnap.data()
    return userData
  } else {
    createUserinFirestore(userCredential)
  }
}

export const createUserinFirestore = async (userCredential) => {
  const userProps = {
    uid: userCredential?.uid,
    name: userCredential?.displayName || null,
    email: userCredential?.email || null,
    photoUrl: userCredential?.photoURL || null,
    bio: '',
    wallet: userCredential?.wallet || null,
    discord: userCredential?.discord || null,
    cohorts: [],
    socialLinks: [
      {
        name: 'github',
        url: null,
      },
      {
        name: 'linkedin',
        url: null,
      },
      {
        name: 'twitter',
        url: null,
      },
      {
        name: 'personalWebsite',
        url: null,
      },
    ],
  }
  await setDoc(doc(collectionRef, userProps.uid), userProps)
}

export const updateUserDiscordIdinFirestore = async (profile, userCredential) => {
  const userProps = {
    discord: profile,
  }
  await updateDoc(doc(collectionRef, userCredential), userProps)
}

export const updateUserWalletInFirestore = async (address, userCredential) => {
  const userProps = {
    wallet: address || '',
  }
  await updateDoc(doc(collectionRef, userCredential), userProps)
}
export const updateUserInFirestore = async (userData, userCredential) => {
  const { name, email, bio, github, twitter, personalWebsite, linkedIn } = userData
  const userProps = {
    name: name || '',
    email: email || '',
    bio: bio || '',
    socialLinks: [
      {name: 'github', url: github || ''},
      { name: 'twitter', url: twitter || ''},
      { name: 'personalWebsite', url: personalWebsite || ''},
      { name: 'linkedin', url: linkedIn || ''},
    ]
  }
  await updateDoc(doc(collectionRef, userCredential), userProps)
}
export const registerUserInCohortInFirestore = async (cohortId, userCredential) => {
  const docRef = doc(cohortsRef, cohortId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const cohortData = docSnap.data()
    const userProps = {
      cohorts: arrayUnion({
        id: cohortData.course.id,
        subscriptionDate: new Date(),
        cohort: doc(db, `cohorts/${cohortId}`)
      })
    }
    await updateDoc(doc(collectionRef, userCredential), userProps)
  }
}
export const submitLessonInFirestore = async (cohortId, userCredential, lesson, section, content, submissionId) => {
  
 
  
  await setDoc(doc(db, "lessons_submissions", submissionId), {
      cohort: doc(db, `cohorts/${cohortId}`),
      user: doc(db, `users/${userCredential.uid}`),
      lesson,
      section,
      content,
  });
  //await addDoc(collection(db, "lessons_submissions"), {
  //  cohort: doc(db, `cohorts/${cohortId}`),
  //  user: doc(db, `users/${userCredential.uid}`),
  //  lesson,
  //  section,
  //  content,
  //});
}