import { faker } from '@faker-js/faker'
import { db } from '../firebase/initFirebase'
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore'
import { mintNFT } from '../functions/index'

jest.mock('../functions/index', () => ({
  mintNFT: jest.fn().mockResolvedValue(undefined),
}))

describe('mintNFT Function', () => {
  let lessonSubmission, change, context

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
      lesson: 'Lesson_2_Add_State.md',
      section: 'Section_1',
      user: 'users/23WEoArqzRf4ORh4cdvadaVsYtj1',
      user_id: '23WEoArqzRf4ORh4cdvadaVsYtj1',
    }
    change = { data: () => lessonSubmission }
    context = { params: { lessonId: 'test-lesson-id' } }
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

    // Check if Firestore trigger (mintNFT) is called
    await mintNFT(change, context)
    expect(mintNFT).toHaveBeenCalledWith(change, context)
  })
})
