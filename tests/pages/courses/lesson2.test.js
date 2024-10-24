/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Course from '../../../pages/courses/[id]'
import { getCourse, getFieldContent } from '../../../lib/course'
import { getAllCohorts, getCurrentCohort } from '../../../lib/cohorts'
import { getLessonsSubmissions } from '../../../lib/lessons'
import { getUserFromFirestore, registerUserInCohortInFirestore } from '../../../lib/user'
import { auth } from '../../../firebase/initFirebase'
import { SessionProvider } from 'next-auth/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { useRouter } from 'next/router'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { resolvedLanguage: 'en' },
  }),
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../../../lib/utils/github', () => ({
  lastCommitId: jest.fn().mockResolvedValue('31110e7771eaf72978f4e0ebf13f2cd72ad3b838'),
}))

jest.mock('../../../lib/course')
jest.mock('../../../lib/cohorts')
jest.mock('../../../lib/lessons')
jest.mock('../../../lib/user')
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
    metadata: {
      en: {
        sections: {
          Section_0: [
            {
              file: 'Lesson_1.md',
              submission_type: 'text',
              submission_text: 'Enter your response.',
              title: 'Lesson 1',
              submission_title: 'Submit',
            },
            {
              twitter: 'Learning Rust',
              file: 'Lesson_2.md',
              submission_type: 'text',
              submission_text: 'Confirm the setup.',
              title: 'Lesson 2',
              submission_title: 'Confirm',
            },
          ],
          Section_1: [
            {
              file: 'Lesson_3.md',
              submission_type: 'upload',
              submission_text: 'Upload a relevant file.',
              title: 'Lesson 3',
              submission_title: 'Upload File',
            },
            {
              twitter: 'Finished the first section',
              file: 'Lesson_4.md',
              submission_type: 'upload',
              submission_text: 'Submit your screenshot.',
              title: 'Lesson 4',
              submission_title: 'Upload Screenshot',
            },
          ],
        },
      },
    },
  }

  const mockCohort = {
    id: 'RU5mLpQrZZWlmftNSB2w',
    startDate: Date.now() - 86400000,
    endDate: Date.now() + 86400000 * 7 + 3600000,
    kickoffStartTime: Date.now() - 86400000,
    kickoffEndTime: Date.now() + 86400000 * 7 + 3600000,
  }

  const mockUser = {
    uid: 'user-123',
    cohort_ids: [],
    cohorts: [],
  }

  beforeEach(() => {
    jest.clearAllMocks()
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
    useRouter.mockReturnValue({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    })
  })

  const renderCourse = (props = {}) => {
    return render(
      <RouterContext.Provider
        value={{
          push: jest.fn(), // Mock do método push
          prefetch: jest.fn(), // Mock do método prefetch
          beforePopState: jest.fn(), // Mock do método beforePopState
        }}
      >
        <SessionProvider session={null}>
          <Course course={mockCourse} currentDate={Date.now()} {...props} />
        </SessionProvider>
      </RouterContext.Provider>
    )
  }

  // Helper function to simulate user registration in the build
  const simulateUserRegistration = () => {
    const subscription = {
      ...mockUser,
      cohorts: [
        {
          cohort_id: 'RU5mLpQrZZWlmftNSB2w', // Simulate the user being registered in a cohort
          course_id: 'Rust_State_Machine',
        },
      ],
    }

    getUserFromFirestore.mockResolvedValue(subscription) // Mock updated user data retrieval
  }

  it('check lesson content appears as expected when clicking on lesson link', async () => {
    renderCourse()

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

      const lessons = []
      Object.values(mockCourse.metadata.en.sections).forEach((section) => {
        section.forEach((item) => {
          if (item.title) {
            lessons.push(item)
          }
        })
      })

      // Verifica se todas as lições estão presentes
      for (const lesson of lessons) {
        const lessonLink = await screen.findByText(lesson.title)
        expect(lessonLink).toBeInTheDocument()
      }

      // Simula o clique na primeira lição
      const firstLessonLink = screen.getByText(lessons[0].title)
      fireEvent.click(firstLessonLink)
      useRouter.mockImplementation(() => ({
        route: '/courses/Rust_State_Machine/Section_0/Lesson_1_What_Are_We_Building.md',
        pathname: '/courses/Rust_State_Machine/Section_0/Lesson_1_What_Are_We_Building.md',
        query: { lang: 'en' },
        asPath: '/courses/Rust_State_Machine/Section_0/Lesson_1_What_Are_We_Building.md?lang=en',
      }))
      
      expect(screen.getByText('Lesson 4')).toBeInTheDocument()
    })
  })
})
