import { db } from '../firebase/initFirebase.js';
import { collection, query, getDocs } from 'firebase/firestore';

export async function getLessonsSubmissions() {
  return await getLessons();
}

async function getLessons() {
  const q = query(collection(db, 'lessons_submissions'));
  const querySnapshot = await getDocs(q);
  const list = [];
  const promises = [querySnapshot].map(async (document, idx) => {
    list.push(document.docs.map(item => Object.assign({}, item.data(), { user: item.data()?.user?.id, cohort: item.data()?.cohort?.id })));
  });
  await Promise.all(promises);
  return list.flat()
}