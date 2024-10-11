/**
 * @jest-environment jsdom
 *
 * This test file uses the JSDOM environment to simulate the browser DOM for testing React components.
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom' // Provides custom matchers for Jest
import AuthPage from '../../../pages/auth' // Importing the AuthPage component
import useAuth from '../../../hooks/useAuth' // Custom authentication hook
import { faker } from '@faker-js/faker' // Library for generating fake data
import { toast } from 'react-toastify' // For displaying toast notifications
import { getAuth, sendPasswordResetEmail } from 'firebase/auth' // Firebase authentication methods
import { auth } from '../../../firebase/initFirebase'

// Mocking external dependencies
jest.mock('../../../hooks/useAuth') // Mock the useAuth hook
jest.mock('react-toastify') // Mock toast notifications
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
})) // Mocking Next.js router
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str) => str, // Mock translation function that returns the input string
    i18n: { changeLanguage: jest.fn() }, // Mock language change function
  }),
}))
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    /* mock auth object */
  })),
  sendPasswordResetEmail: jest.fn(),
}))

describe('Testing the signIn page', () => {
  beforeAll(() => {
    // Mock the useAuth hook to provide mock functions for signup and login methods
    useAuth.mockReturnValue({
      signup: jest.fn(),
      loginGoogle: jest.fn(),
      loginGithub: jest.fn(),
    })
  })

  afterEach(() => {
    jest.clearAllMocks() // Clear mocks after each test to avoid test interference
  })

  it('Renders the login form', () => {
    render(<AuthPage />) // Render the AuthPage component

    // Check if the required elements are present in the document
    expect(screen.getByText('buttons.register_now')).toBeInTheDocument() // Register now button
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument() // Email input field
    expect(screen.getByLabelText('form.password')).toBeInTheDocument() // Password input field
    expect(screen.getByText('buttons.log_in')).toBeInTheDocument() // Log in button
  })

  it('Calls the login function with correct data', async () => {
    const mockLogin = jest.fn() // Create a mock login function
    useAuth.mockReturnValue({ login: mockLogin }) // Override useAuth to use the mock function

    const email = faker.internet.email() // Generate a fake email
    const password = faker.internet.password() // Generate a fake password

    render(<AuthPage />) // Render the AuthPage component

    // Fill in the login form
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: email } })
    fireEvent.change(screen.getByLabelText('form.password'), { target: { value: password } })
    fireEvent.click(screen.getByText('buttons.log_in')) // Click the login button

    // Wait for the login function to be called with the correct parameters
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({ email, password })
    })
  })

  it('Toggles between login and registration forms', () => {
    render(<AuthPage />) // Render the AuthPage component

    // Check if the register now button is present and click it
    expect(screen.getByText('buttons.register_now')).toBeInTheDocument()
    fireEvent.click(screen.getByText('buttons.register_now'))

    // Verify that the sign-in button is now present
    expect(screen.getByText('buttons.sign_in')).toBeInTheDocument()

    // Click the sign-in button to toggle back
    fireEvent.click(screen.getByText('buttons.sign_in'))
    expect(screen.getByText('buttons.register_now')).toBeInTheDocument() // Check that register now button is visible again
  })

  it('Tests the password recovery functionality', async () => {
    // Mock the sendPasswordResetEmail function
    sendPasswordResetEmail.mockResolvedValue()

    getAuth.mockReturnValue(auth)

    render(<AuthPage />)
    const emailTest = 'teste@exemplo.com'

    // Get the email input field
    const emailInput = screen.getByLabelText('E-mail')

    // Fill in the email field
    fireEvent.change(emailInput, { target: { value: emailTest } })

    // Verify that the email input has the correct value
    expect(emailInput).toHaveValue(emailTest)

    // Check for forgot password button and click it
    const forgotPasswordButton = screen.getByText('buttons.forgot_password')
    expect(forgotPasswordButton).toBeInTheDocument()
    fireEvent.click(forgotPasswordButton)

    await waitFor(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, emailTest)
    })

    // Verify success toast is displayed
    expect(toast.success).toHaveBeenCalledWith('messages.email_sent_success')
  })

  // Add a new test for the error case
  it('Displays error message if password recovery fails', async () => {
    // Mock the sendPasswordResetEmail function to reject with an error
    const errorMessage = 'Test error'
    sendPasswordResetEmail.mockRejectedValue(new Error(errorMessage))

    getAuth.mockReturnValue(auth)

    render(<AuthPage />)
    const emailTest = 'teste@exemplo.com'

    // Fill in the email field
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: emailTest } })

    // Click forgot password button
    fireEvent.click(screen.getByText('buttons.forgot_password'))

    await waitFor(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, emailTest)
      expect(toast.error).toHaveBeenCalledWith(errorMessage)
    })
  })
})
