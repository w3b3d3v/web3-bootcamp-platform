/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Course from '../../../pages/courses/[id]'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { getCourse, getFieldContent } from '../../../lib/course'
import { getAllCohorts, getCurrentCohort } from '../../../lib/cohorts'
import { getLessonsSubmissions } from '../../../lib/lessons'
import { getUserFromFirestore, registerUserInCohortInFirestore } from '../../../lib/user'
import { auth } from '../../../firebase/initFirebase'
import { SessionProvider } from 'next-auth/react'

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../../../lib/course', () => ({
  getCourse: jest.fn(),
  getFieldContent: jest.fn(),
}))

jest.mock('../../../lib/cohorts', () => ({
  getAllCohorts: jest.fn(),
  getCurrentCohort: jest.fn(),
}))

jest.mock('../../../lib/lessons', () => ({
  getLessonsSubmissions: jest.fn(),
}))

jest.mock('../../../lib/user', () => ({
  getUserFromFirestore: jest.fn(),
  registerUserInCohortInFirestore: jest.fn(),
}))

jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}))

describe('Course Component', () => {
  const mockCourse = {
    id: 'Rust_State_Machine',
    active: true,
    title: 'Test Course',
    description: 'A test course description',
    sections: {
      Section_1: [
        { title: 'Lesson 1', file: 'lesson-1' },
        { title: 'Lesson 2', file: 'lesson-2' },
      ],
    },
  }

  const mockCohort = {
    id: 'RU5mLpQrZZWlmftNSB2w',
    startDate: 1729080000,
    endDate: 1729724400,
    kickoffStartTime: 1729080000,
    kickoffEndTime: 1729083600,
  }

  const mockUser = {
    uid: 'user-123',
    cohort_ids: [],
    cohorts: [],
  }

  beforeEach(() => {
    jest.clearAllMocks()
    useTranslation.mockReturnValue({
      t: (key) => key,
      i18n: { resolvedLanguage: 'en' },
    })
    useRouter.mockReturnValue({ query: {} })
    getCourse.mockResolvedValue(mockCourse)
    getFieldContent.mockImplementation((obj, field) => obj[field])
    getAllCohorts.mockResolvedValue([mockCohort])
    getCurrentCohort.mockReturnValue(mockCohort)
    getLessonsSubmissions.mockResolvedValue([])
    getUserFromFirestore.mockResolvedValue(mockUser)
    auth.currentUser = { uid: 'user-123' }

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: 'fake data' }),
      })
    )
  })

  it('renders the course title and description', async () => {
    render(<Course course={mockCourse} currentDate={new Date().toISOString()} />)

    expect(screen.getByText('Test Course')).toBeInTheDocument()
    expect(screen.getByText('A test course description')).toBeInTheDocument()
  })

  it('allows user to register for the course', async () => {
    render(<Course course={mockCourse} currentDate={new Date().toISOString()} />)

    const registerButton = await screen.findByText('subscribeNow')
    expect(registerButton).toBeInTheDocument()
    fireEvent.click(registerButton)

    expect(registerUserInCohortInFirestore).toHaveBeenCalledWith('RU5mLpQrZZWlmftNSB2w', 'user-123')
  })

  it('shows calendar buttons after subscribing to the course', async () => {
    // Initial render without user registered
    render(
      <SessionProvider session={null}>
        <Course course={mockCourse} currentDate={1729015296} />
      </SessionProvider>
    )

    const registerButton = await screen.findByText('subscribeNow')
    expect(registerButton).toBeInTheDocument()
    fireEvent.click(registerButton)

    await waitFor(async () => {
      const registeredUser = {
        ...mockUser,
        cohorts: [
          {
            cohort_id: 'RU5mLpQrZZWlmftNSB2w',
            course_id: 'Rust_State_Machine',
          },
        ],
      }

      getUserFromFirestore.mockResolvedValue(registeredUser)
      const calendar = await screen.findByText('liveEvent')
      expect(calendar).toBeInTheDocument()
    })
  })
})
