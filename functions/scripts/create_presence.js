require('dotenv').config()

const { initializeApp } = require('firebase/app')
const { getFirestore, collection, doc, writeBatch } = require('firebase/firestore')
const { getAuth } = require('firebase/auth')
const { getStorage } = require('firebase/storage')
console.log('writing to ' + process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID + '.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID + '.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get instances of the services
const db = getFirestore(app)

// Data to be added
const discordIds = [
  '177946108574564352',
  '260571905814298625',
  '294843769377914890',
  '305880537388548096',
  '403704889080938497',
  '442338875336163328',
  '444118786535325696',
  '521121185413464064',
  '548618495383044129',
  '684952119023108098',
  '833854821915951145',
  '869906978758066226',
  '935141226737442887',
  '955999639486746645',
  '993895907848364042',
]

async function addDiscordIds() {
  const channel_id = '971893080410185728'
  const channel_name = '📚・Study groups'
  const guild_id = '898706705779687435'
  const guild_name = 'WEB3DEV'
  const timestamp = new Date('2024-04-24T13:12:00')

  const batch = writeBatch(db)

  discordIds.forEach((discordId) => {
    const docRef = doc(collection(db, 'study_group_presence'))
    batch.set(docRef, {
      channel_id: channel_id,
      channel_name: channel_name,
      discord_id: discordId,
      guild_id: guild_id,
      guild_name: guild_name,
      timestamp: timestamp,
    })
  })

  await batch.commit()
  console.log('Discord IDs have been added to Firestore.')
}

addDiscordIds().catch(console.error)
