import { db } from '../firebase/initFirebase.js'
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore'

export async function getAllCourses() {
  const q = query(collection(db, 'courses'), orderBy('index'))

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })
}

export async function getCourseAnalytics(course_id) {
  try {
    const q = query(
      collection(db, 'builds_analytics'),
      where('course_id', '==', course_id)
    );
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs[0].data();
  }
  catch(e) {
    console.error(e);
    return;
  }
}