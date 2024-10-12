// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
let firebaseConfig

if (process.env.NODE_ENV === 'test') {
  firebaseConfig = {
    apiKey: 'dummy_api_key',
    authDomain: 'dummy_auth_domain',
    projectId: 'web3dev-development',
    storageBucket: 'dummy_storage_bucket',
    messagingSenderId: 'dummy_sender_id',
    appId: 'dummy_app_id',
    measurementId: 'dummy_measurement_id',
  }
} else {
  firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID + '.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID + '.appspot.com',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()
const storage = getStorage(app)

async function startEmulators() {
  if (!global['EMULATORS_STARTED']) {
    global['EMULATORS_STARTED'] = true
    try {
      await connectAuthEmulator(auth, 'http://localhost:9099')
      await connectFirestoreEmulator(db, 'localhost', 8080)
      await connectStorageEmulator(storage, 'localhost', 9199)
      console.log('Emulators connected successfully')
    } catch (error) {
      console.error('Error connecting to emulators:', error)
    }
  }
}

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  startEmulators().catch(console.error)
}
// const analytics = getAnalytics(app);

export { auth, app, db, storage }
