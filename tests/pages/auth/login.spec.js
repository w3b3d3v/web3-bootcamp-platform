/**
 * @jest-environment jsdom
 *
 * This test file uses the JSDOM environment to simulate the browser DOM for testing React components.
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom' // Provides custom matchers for Jest
import AuthPage from '../../../pages/auth' // Importing the AuthPage component
import useAuth from '../../../hooks/useAuth' // Custom authentication hook
import { useTranslation } from 'react-i18next' // For handling translations
import { faker } from '@faker-js/faker' // Library for generating fake data
import { act } from 'react' // Importing React act for async operations
import { toast } from 'react-toastify' // For displaying toast notifications
import { getAuth, sendPasswordResetEmail } from 'firebase/auth' // Firebase authentication methods

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
  getAuth: jest.fn(), // Mock getAuth function
  sendPasswordResetEmail: jest.fn(), // Mock sendPasswordResetEmail function
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

  // BUG: In pages/auth/index.js I can't find the button buttons.recover_password and nowhere in the codebase but in production this text appears
  it.skip('Displays error message for empty fields', async () => {
    render(<AuthPage />) // Render the AuthPage component

    await act(async () => {
      fireEvent.click(screen.getByText('buttons.log_in')) // Click the login button with empty fields
    })

    expect(toast.error).toHaveBeenCalled() // Verify that the error toast is displayed
  })

  it.skip('Tests the password recovery functionality', async () => {
    sendPasswordResetEmail.mockResolvedValue() // Mock resolved value for the password reset email

    render(<AuthPage />) // Render the AuthPage component
    const emailTest = 'teste@exemplo.com' // Sample email for testing password recovery

    // Fill in the email field
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: emailTest } })
    expect(screen.getByText('buttons.forgot_password')).toBeInTheDocument() // Check for forgot password button
    fireEvent.click(screen.getByText('buttons.forgot_password')) // Click forgot password button

    expect(screen.getByText('buttons.recover_password')).toBeInTheDocument() // Check for recover password button

    await waitFor(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(expect.anything(), emailTest) // Verify sendPasswordResetEmail is called with email
    })

    // FIX: Toastify isn't showing up
    expect(toast.success).toHaveBeenCalledWith('messages.email_sent_success') // Verify success toast is displayed
  })

  // BUG: Toastify isn't showing up
  it.skip('Displays error message if password recovery fails', async () => {
    sendPasswordResetEmail.mockRejectedValue(new Error('Erro de teste')) // Mock rejection for password reset email

    render(<AuthPage />) // Render the AuthPage component
    const emailTest = 'teste@exemplo.com' // Sample email for testing password recovery

    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: emailTest } }) // Fill in the email field
    fireEvent.click(screen.getByText('buttons.forgot_password')) // Click forgot password button

    await waitFor(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(expect.anything(), emailTest) // Verify email is sent
    })

    expect(toast.error).toHaveBeenCalledWith('Erro de teste') // Verify error toast is displayed
  })
})
