import { db } from '../firebase/initFirebase.js'
import { useEffect, useState } from 'react'
import {
  doc,
  query,
  getDoc,
  onSnapshot,
  collection,
  setDoc,
  updateDoc
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
    wallet: address,
  }
  await updateDoc(doc(collectionRef, userCredential), userProps)
}

export const registerUserInCohortInFirestore = async (cohort, userCredential) => {
  const docRef = doc(cohortsRef, cohort)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const cohortData = docSnap.data()
    console.log(cohortData)
    const userProps = {
      cohorts: [{
        id: cohortData.course.id,
        startDate: cohortData.start_date.toDate(),
        endDate: cohortData.end_date.toDate()
      }]
    }
    await updateDoc(doc(collectionRef, userCredential), userProps)
  }
}