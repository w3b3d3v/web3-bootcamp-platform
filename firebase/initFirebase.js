// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase

const firebaseConfig = {
  "apiKey": process.env.FIREBASE_API_KEY,
  "authDomain": process.env.FIREBASE_PROJECT_ID + ".firebaseapp.com",
  "projectId": process.env.FIREBASE_PROJECT_ID,
  "storageBucket": process.env.FIREBASE_PROJECT_ID + ".appspot.com",
  "messagingSenderId": process.env.FIREBASE_SENDER_ID,
  "appId": process.env.FIREBASE_APP_ID,
  "measurementId": process.env.FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore();

// const analytics = getAnalytics(app);

export { auth, app, db };
