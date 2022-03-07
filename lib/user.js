import { db } from '../firebase/initFirebase.js'
import { useEffect, useState } from 'react'
import {
  doc,
  query,
  getDoc,
  onSnapshot,
  collection,
  setDoc,
} from 'firebase/firestore'

const collectionRef = collection(db, 'users')

export async function getUserFromFirestore(userCredential) {
  console.log('userCredential', userCredential)
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
    discord: null,
    wallet: null,
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
