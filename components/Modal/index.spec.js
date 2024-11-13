/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Modal from './index'
import '@testing-library/jest-dom'
import { serverTimestamp } from 'firebase/firestore'
import { getUserFromFirestore } from '../../lib/user'
import { getAllCohorts, getCurrentCohort } from '../../lib/cohorts'

jest.mock('uuidv4', () => ({ uuid: jest.fn() }))
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key, i18n: { resolvedLanguage: 'en' } }),
}))
jest.mock('../../lib/user')
jest.mock('../../lib/cohorts')

describe('Check if submit link is calling mintNFT function', () => {
  const mockOnClose = jest.fn()

  const mockSubmission = {
    course: { id: 'Rust_State_Machine' },
    title: 'Upload Assignment',
    text: 'Submit your assignment',
    type: 'text',
  }

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
    jest.clearAllMocks()
    getAllCohorts.mockResolvedValue([mockCohort])
    getCurrentCohort.mockReturnValue(mockCohort)
    getUserFromFirestore.mockResolvedValue(mockUser)
  })

  const setupModal = () => {
    render(
      <Modal
        openExternal
        onClose={mockOnClose}
        course={mockSubmission.course}
        lesson={lessonSubmission.lesson}
        section={lessonSubmission.section}
        submissionType={mockSubmission.type}
        submissionTitle={mockSubmission.title}
        submissionText={mockSubmission.text}
      />
    )
  }

  it('should display modal content correctly', () => {
    setupModal()
    expect(screen.getByText(mockSubmission.title)).toBeInTheDocument()
    expect(screen.getByText(mockSubmission.text)).toBeInTheDocument()

    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: lessonSubmission.content.value } })
    expect(textarea.value).toBe(lessonSubmission.content.value)

    expect(screen.getByText('send')).toBeInTheDocument()
    expect(screen.getByText('cancel')).toBeInTheDocument()
  })
})
