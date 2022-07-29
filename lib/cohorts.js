import { db } from "../firebase/initFirebase.js";
import { collection, query, getDocs } from "firebase/firestore";

export async function getAllCohorts() {
  const q = query(collection(db, "cohorts"));

  const querySnapshot = await getDocs(q);
  const list = [];
  querySnapshot.forEach((doc) => {
    const startDate = new Date(doc.data().startDate?.toDate());
    const endDate = new Date(doc.data().endDate?.toDate());
    const kickoffStartTime = new Date(doc.data().kickoffStartTime?.toDate());
    const kickoffEndTime = new Date(doc.data().kickoffEndTime?.toDate());
    const courseId = doc.data()?.course_id;
    list.push({
      id: doc.id,
      courseId: courseId,
      startDate: startDate,
      endDate: endDate,
      kickoffStartTime: kickoffStartTime,
      kickoffEndTime: kickoffEndTime,
    });
  });
  return list;
}

export const getCohortToKickoffTomorrow = async () => {
  let cohortObj = {};
  const cohorts = await getAllCohorts();
  cohorts.forEach((cohort) => {
    const data = cohort.data();
    const diff =
      (new Date(data.kickoffStartTime.toDate().toLocaleString()).getTime() - new Date().getTime()) /
      1000;
    if (diff > 0 && diff < 360) return (cohortObj = cohort);
  });
  return cohortObj;
};
