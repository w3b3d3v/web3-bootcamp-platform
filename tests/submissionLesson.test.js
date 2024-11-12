import { faker } from '@faker-js/faker'
import { db } from '../firebase/initFirebase'
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore'

describe('mintNFT Function', () => {
  let lessonSubmission

  beforeEach(() => {
    setupTestData()
  })

  const setupTestData = () => {
    lessonSubmission = {
      cohort_id: 'RU5mLpQrZZWlmftNSB2w',
      content: {
        type: 'text',
        value: faker.string.alpha(10),
      },
      createdAt: serverTimestamp(),
      lesson: 'Lesson_4_Use_the_Runtime_Macro.md',
      section: 'Section_1',
      user: 'users/23WEoArqzRf4ORh4cdvadaVsYtj1',
      user_id: '23WEoArqzRf4ORh4cdvadaVsYtj1',
    }
  }

  const createSubmissionDocument = async (submissionId) => {
    const docRef = doc(db, 'lessons_submissions', submissionId)
    await setDoc(docRef, {
      ...lessonSubmission,
      cohort: doc(db, `cohorts/${lessonSubmission.cohort_id}`),
      user: doc(db, lessonSubmission.user),
    })
    return docRef
  }

  it('should create a submission document in lessons_submissions', async () => {
    const submissionId = faker.string.uuid()
    const docRef = await createSubmissionDocument(submissionId)

    const submissionDoc = await getDoc(docRef)
    expect(submissionDoc.exists()).toBe(true)
    expect(submissionDoc.data()).toMatchObject({
      cohort_id: lessonSubmission.cohort_id,
      content: lessonSubmission.content,
      createdAt: expect.any(Object),
      lesson: lessonSubmission.lesson,
      section: lessonSubmission.section,
      user_id: lessonSubmission.user_id,
    })
  })
})
