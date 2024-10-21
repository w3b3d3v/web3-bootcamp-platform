/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom' // Provides custom matchers for asserting the presence of DOM elements
import Course from '../../../pages/courses/[id]' // Import the Course page component
import { getCourse, getFieldContent } from '../../../lib/course'
import { getAllCohorts, getCurrentCohort } from '../../../lib/cohorts'
import { getLessonsSubmissions } from '../../../lib/lessons'
import { getUserFromFirestore, registerUserInCohortInFirestore } from '../../../lib/user'
import { auth } from '../../../firebase/initFirebase'
import { SessionProvider } from 'next-auth/react'

// Mock external dependencies to isolate and control their behavior during tests
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // Mock translation function that returns the translation key
    i18n: { resolvedLanguage: 'en' }, // Mock i18n object with the resolved language
  }),
}))

jest.mock('next/router', () => ({
  useRouter: () => ({ query: {} }), // Mock the Next.js router hook with an empty query object
}))

// Mocking external libraries for backend operations and components
jest.mock('../../../lib/course')
jest.mock('../../../lib/cohorts')
jest.mock('../../../lib/lessons')
jest.mock('../../../lib/user')

// Mocking the Next.js <Head> component
jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>, // Mock the <Head> component to avoid issues with it in the tests
}))

describe('Course page when not yet started', () => {
  // Mock data representing a course and a cohort
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
    startDate: new Date(Date.now() + 86400000 * 7).getTime(), // Mock cohort starting date 7 days from now
    endDate: new Date(Date.now() + 86400000 * 7 + 3600000).getTime(), // Mock cohort end date 1 hour after start
    kickoffStartTime: new Date(Date.now() + 86400000 * 7).getTime(), // Mock cohort kickoff start time
    kickoffEndTime: new Date(Date.now() + 86400000 * 7 + 3600000).getTime(), // Mock cohort kickoff end time
  }

  const mockUser = {
    uid: 'user-123',
    cohort_ids: [], // User initially not part of any cohort
    cohorts: [],
  }

  // Before each test, reset all mock functions and set the default mock values
  beforeEach(() => {
    jest.clearAllMocks()
    getCourse.mockResolvedValue(mockCourse) // Mock getCourse function to return mock course data
    getFieldContent.mockImplementation((obj, field) => obj[field]) // Mock field content retrieval
    getAllCohorts.mockResolvedValue([mockCohort]) // Mock getAllCohorts function to return a list of cohorts
    getCurrentCohort.mockReturnValue(mockCohort) // Mock getCurrentCohort function to return the current cohort
    getLessonsSubmissions.mockResolvedValue([]) // Mock lesson submissions
    getUserFromFirestore.mockResolvedValue(mockUser) // Mock user data retrieval from Firestore
    auth.currentUser = { uid: 'user-123' } // Mock the current user

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: 'fake data' }), // Mock fetch API to return dummy data
      })
    )
  })

  // Helper function to render the Course component with default or provided props
  const renderCourse = (props = {}) => {
    return render(
      <SessionProvider session={null}>
        {' '}
        {/* Wrap the component in SessionProvider for authentication context */}
        <Course course={mockCourse} currentDate={new Date().getTime()} {...props} />{' '}
        {/* Pass mock course data */}
      </SessionProvider>
    )
  }

  it('shows NotFound component if course is not active', async () => {
    renderCourse({ course: { ...mockCourse, active: false } }) // Render with an inactive course
    await waitFor(() => {
      expect(screen.getByText('Oops!')).toBeInTheDocument() // Expect the "Oops!" message to be shown
    })
  })

  it('renders the course title and description', async () => {
    renderCourse() // Render the course component
    expect(screen.getByText('Test Course')).toBeInTheDocument() // Expect course title to be displayed
    expect(screen.getByText('A test course description')).toBeInTheDocument() // Expect course description to be displayed
  })

  it('allows user to register for the course', async () => {
    renderCourse() // Render the course component
    const registerButton = await screen.findByText('subscribeNow') // Find the subscription button
    expect(registerButton).toBeInTheDocument() // Ensure the subscription button is present
    fireEvent.click(registerButton) // Simulate a click on the registration button
    expect(registerUserInCohortInFirestore).toHaveBeenCalledWith('RU5mLpQrZZWlmftNSB2w', 'user-123') // Ensure user registration is triggered
  })

  it('shows Calendar buttons after subscribing to the course', async () => {
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
      const calendar = await screen.findByText('addToCalendar') // Ensure "Add to Calendar" button is present
      const addToGoogleCalendar = await screen.findByText('addToGoogleCalendar') // Ensure "Add to Google Calendar" button is present

      expect(calendar).toBeInTheDocument() // Check that calendar button is visible
      expect(addToGoogleCalendar).toBeInTheDocument() // Check that Google Calendar button is visible
    })
  })

  it('shows Discord and Wallet buttons after subscribing to the course', async () => {
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
      const discord = await screen.findByText('connectYourDiscord') // Ensure "Connect Your Discord" button is present
      const wallet = await screen.findByText('connectWalletButton') // Ensure "Connect Wallet" button is present

      expect(discord).toBeInTheDocument() // Check that Discord button is visible
      expect(wallet).toBeInTheDocument() // Check that Wallet button is visible
    })
  })
})