import { db } from '../firebase/initFirebase.js'
import {
  doc,
  getDoc,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from 'firebase/firestore'
import { mixpanel } from './utils/mixpanel'

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
  let githubUrl = ''
  if (userCredential?.providerData) {
    const github_id = userCredential.providerData.find(
      (item) => item.providerId == 'github.com'
    )?.uid
    await fetch(`https://api.github.com/user/${github_id}`)
      .then((res) => res.json())
      .then(async (data) => {
        githubUrl = data.html_url
      })
  }
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
        url: githubUrl || null,
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
  mixpanel.track('user_created', userProps)
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
      { name: 'github', url: github || '' },
      { name: 'twitter', url: twitter || '' },
      { name: 'personalWebsite', url: personalWebsite || '' },
      { name: 'linkedin', url: linkedIn || '' },
    ],
  }
  await updateDoc(doc(collectionRef, userCredential), userProps)
}
export const updateUserGithub = async (github, userCredential) => {
  const docRef = doc(collectionRef, userCredential)
  const prevSocial = await getDoc(docRef).then((docSnap) => {
    const userData = docSnap.data()
    return userData.socialLinks
  })
  const filtered = prevSocial.filter((item) => item.name !== 'github')
  const userProps = {
    socialLinks: [{ name: 'github', url: github || '' }, ...filtered],
  }
  await updateDoc(doc(collectionRef, userCredential), userProps)
}
export const updateUserProfilePicInFirestore = async (userCredential, pictureUrl) => {
  const userProps = {
    photoUrl: pictureUrl,
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
        course_id: cohortData.course_id,
        cohort_id: cohortId,
        subscriptionDate: new Date(),
      }),
      cohort_ids: arrayUnion(cohortId),
    }
    await updateDoc(doc(collectionRef, userCredential), userProps)
    mixpanel.track('cohort_signup', cohortData)
  }
}
export const submitLessonInFirestore = async (
  cohortId,
  userCredential,
  lesson,
  section,
  content,
  submissionId
) => {
  const lesson_submission = {
    user_id: userCredential.uid,
    cohort_id: cohortId,
    lesson,
    section,
    content,
    createdAt: serverTimestamp(),
  }
  await setDoc(doc(db, 'lessons_submissions', submissionId), {
    ...lesson_submission,
    cohort: doc(db, `cohorts/${cohortId}`),
    user: doc(db, `users/${userCredential.uid}`),
  })
  mixpanel.track('lesson_submission', lesson_submission)
}
