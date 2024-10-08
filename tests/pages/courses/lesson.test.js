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

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { resolvedLanguage: 'en' },
  }),
}))

const router = {
  push: (_url) => Promise.resolve(true),
  beforePopState: jest.fn(() => null),
  prefetch: (_url) => Promise.resolve(),
}

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
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
  })

  const renderCourse = (props = {}) => {
    return render(
      <RouterContext.Provider value={router}>
        <SessionProvider session={null}>
          <Course course={mockCourse} currentDate={Date.now()} {...props} />
        </SessionProvider>
      </RouterContext.Provider>
    )
  }

  // it('renders all sections and files dynamically', async () => {
  //   renderCourse()

  //   const registerButton = await screen.findByText('subscribeNow')
  //   expect(registerButton).toBeInTheDocument()

  //   fireEvent.click(registerButton)

  //   await waitFor(async () => {
  //     const registeredUser = {
  //       ...mockUser,
  //       cohorts: [
  //         {
  //           cohort_id: 'RU5mLpQrZZWlmftNSB2w',
  //           course_id: 'Rust_State_Machine',
  //         },
  //       ],
  //     }

  //     getUserFromFirestore.mockResolvedValue(registeredUser)

  //     Object.entries(mockCourse.metadata.en.sections).forEach(([sectionName, sectionItems]) => {
  //       sectionItems.forEach((item) => {
  //         if (item.file) {
  //           const testId = `${mockCourse.id}-${sectionName}-${item.file}`
  //           const sectionElement = screen.getByTestId(testId)

  //           expect(sectionElement).toBeInTheDocument()
  //         }
  //       })
  //     })
  //   })
  // })

  it('verificar se o conteúdo de cada lição aparece conforme o esperado e clica no link da lição', async () => {
    renderCourse() // Render the course component

    const registerButton = await screen.findByText('subscribeNow') // Find the subscription button
    expect(registerButton).toBeInTheDocument() // Ensure the subscription button is present
    fireEvent.click(registerButton) // Simulate a click on the registration button

    await waitFor(async () => {
      const registeredUser = {
        ...mockUser,
        cohorts: [
          {
            cohort_id: 'RU5mLpQrZZWlmftNSB2w', // Simulate the user being registered in a cohort
            course_id: 'Rust_State_Machine',
          },
        ],
      }

      getUserFromFirestore.mockResolvedValue(registeredUser) // Mock updated user data retrieval

      const lessons = []

      Object.values(mockCourse.metadata.en.sections).forEach((section) => {
        section.forEach((item) => {
          if (item.title) {
            lessons.push(item.title)
          }
        })
      })

      lessons.forEach((title) => {
        expect(screen.getByText(title)).toBeInTheDocument()
      })

      
      await waitFor(async () => {
        fireEvent.click(screen.getByText(lessons[0]))

      })
      screen.getByText('Introduction to the Rust State Machine')
    })
  })

  // it('verificar se o envio de lição esta funcionando corretamente.', async () => {
  //   renderCourse()

  //   const registerButton = await screen.findByText('subscribeNow')
  //   expect(registerButton).toBeInTheDocument()

  //   fireEvent.click(registerButton)

  //   await waitFor(async () => {
  //     const registeredUser = {
  //       ...mockUser,
  //       cohorts: [
  //         {
  //           cohort_id: 'RU5mLpQrZZWlmftNSB2w',
  //           course_id: 'Rust_State_Machine',
  //         },
  //       ],
  //     }

  //     getUserFromFirestore.mockResolvedValue(registeredUser)
  //   })
  // })
})
