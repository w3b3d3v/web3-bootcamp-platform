/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Modal from '../components/Modal/index'
import '@testing-library/jest-dom'
import { serverTimestamp } from 'firebase/firestore'
import { getUserFromFirestore, submitLessonInFirestore } from '../lib/user'
import { auth } from '../firebase/initFirebase'
import { getAllCohorts, getCurrentCohort } from '../lib/cohorts'
import { mintNFT } from '../functions/index'

jest.mock('uuidv4', () => ({ uuid: jest.fn() }))
jest.mock('../functions/index', () => ({ mintNFT: jest.fn().mockResolvedValue(undefined) }))
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key, i18n: { resolvedLanguage: 'en' } }),
}))
jest.mock('../lib/user')
jest.mock('../lib/cohorts')

describe('Modal - NFT Submission', () => {
  const mockOnClose = jest.fn()
  const mockCourse = { id: 'Rust_State_Machine' }
  const lessonSubmission = {
    cohort_id: 'RU5mLpQrZZWlmftNSB2w',
    content: { type: 'text', value: 'Conteúdo aleatório para teste' },
    createdAt: serverTimestamp(),
    lesson: 'Lesson_2_Add_State.md',
    section: 'Section_1',
  }
  const mockUser = {
    uid: '27mBUecPdbEjIDdFfzYPQiQ9Uyqr',
    cohorts: [{ cohort_id: 'RU5mLpQrZZWlmftNSB2w', course_id: 'Rust_State_Machine' }],
  }
  const mockCohort = {
    id: 'RU5mLpQrZZWlmftNSB2w',
    startDate: Date.now() + 86400000 * 7,
    endDate: Date.now() + 86400000 * 7 + 3600000,
    kickoffStartTime: Date.now() + 86400000 * 7,
    kickoffEndTime: Date.now() + 86400000 * 7 + 3600000,
  }

  const setupMocks = () => {
    jest.clearAllMocks()
    getAllCohorts.mockResolvedValue([mockCohort])
    getCurrentCohort.mockReturnValue(mockCohort)
    getUserFromFirestore.mockResolvedValue(mockUser)
  }

  const renderModal = () => {
    render(
      <Modal
        openExternal
        onClose={mockOnClose}
        course={mockCourse}
        lesson={lessonSubmission.lesson}
        section={lessonSubmission.section}
        submissionType="text"
        submissionTitle="Upload Assignment"
        submissionText="Submit your assignment"
      />
    )
  }

  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ data: 'fake data' }) })
    )
    global.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  })

  beforeEach(() => {
    setupMocks()
    auth.currentUser = { uid: mockUser.uid }
  })

  it('should submit lesson correctly and call mintNFT function', async () => {
    const submitLessonSpy = jest.spyOn(require('../lib/user'), 'submitLessonInFirestore')
    const change = { data: () => lessonSubmission }
    const context = { params: { lessonId: 'test-lesson-id' } }

    renderModal()
    await waitFor(async () => {
      const textarea = screen.getByRole('textbox')
      fireEvent.change(textarea, { target: { value: lessonSubmission.content.value } })
      expect(textarea.value).toBe(lessonSubmission.content.value)

      const submitButton = screen.getByText('send')
      fireEvent.click(submitButton)

      expect(submitLessonSpy).toHaveBeenCalledWith(
        lessonSubmission.cohort_id,
        mockUser,
        lessonSubmission.lesson,
        lessonSubmission.section,
        lessonSubmission.content,
        undefined
      )
      await mintNFT(change, context)
      expect(mintNFT).toHaveBeenCalledWith(change, context)
    })
  })
})
