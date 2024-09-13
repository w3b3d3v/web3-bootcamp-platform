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
const studyGroupsRef = collection(db, 'study_groups')

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
  const docRef = doc(collectionRef, userCredential.uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('User already exists in Firestore')
    return
  }

  let githubUrl = ''
  if (userCredential.providerData && Array.isArray(userCredential.providerData)) {
    const githubProvider = userCredential.providerData.find(
      (item) => item.providerId === 'github.com'
    )
    if (githubProvider) {
      githubUrl = `https://github.com/${githubProvider.uid}`
    }
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
    contextLevel: 'Beginner',
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
  const userProps = {
    name: userData?.name || '',
    email: userData?.email || '',
    bio: userData?.bio || '',
    devExp: userData?.devExp || null,
    blockchainExp: userData?.blockchainExp || null,
    technologies: userData?.technologies || [],
    builder: userData?.builder || [],
    socialLinks: [
      { name: 'github', url: userData.github || '' },
      { name: 'twitter', url: userData.twitter || '' },
      { name: 'personalWebsite', url: userData.personalWebsite || '' },
      { name: 'linkedin', url: userData.linkedIn || '' },
    ],
    zip: userData?.zip || '',
    country: userData?.country || '',
  }
  if (userData?.referred_by) {
    userProps.referred_by = userData?.referred_by
    userProps.referred_at = serverTimestamp()
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

export const findSocialLinks = (name, user) => user?.socialLinks?.find((link) => link.name === name)

export const getUserByDiscordId = async (discordId) => {
  const q = query(usersRef, where('discord.id', '==', discordId))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return null
  }

  const userData = querySnapshot.docs[0].data()
  return userData
}

export const registerUserInStudyGroupInFirestore = async (studyGroupId, userCredential) => {
  const docRef = doc(studyGroupsRef, studyGroupId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const studyGroupData = docSnap.data()
    const userProps = {
      study_groups: arrayUnion({
        study_group_id: studyGroupId,
        subscriptionDate: new Date(),
      }),
      study_group_ids: arrayUnion(studyGroupId),
    }

    await updateDoc(doc(collectionRef, userCredential), userProps)
    mixpanel.track('study_group_signup', studyGroupData)
  } else {
    console.error(`Study group with ID ${studyGroupId} does not exist`)
  }
}
