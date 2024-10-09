/**
 * @jest-environment jsdom
 *
 * This test file uses the JSDOM environment to simulate a browser-like DOM for React components.
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react' // Import necessary testing utilities
import '@testing-library/jest-dom' // Custom matchers for Jest
import AuthPage from '../../../pages/auth' // Import the AuthPage component to be tested
import useAuth from '../../../hooks/useAuth' // Import the custom authentication hook
import { faker } from '@faker-js/faker' // Import Faker for generating fake data
import { useTranslation } from 'react-i18next' // Import translation hook for localization
import { toast } from 'react-toastify' // Import toast notifications for alerts

// Mocking external dependencies
jest.mock('../../../hooks/useAuth') // Mocking the useAuth hook to avoid real authentication calls
jest.mock('react-toastify') // Mocking the toast notifications to verify alerts without actual rendering
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/', // Mocking Next.js router's return values
      pathname: '',
      query: '',
      asPath: '',
    }
  },
}))
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str) => str, // Mock translation function that returns the input string
    i18n: { changeLanguage: jest.fn() }, // Mock function for changing languages
  }),
}))

describe('Testing the signUp page', () => {
  // Set up the mock functions before each test to ensure isolation
  beforeEach(() => {
    useAuth.mockReturnValue({
      signup: jest.fn(), // Mock signup function
      loginGoogle: jest.fn(), // Mock Google login function
      loginGithub: jest.fn(), // Mock GitHub login function
    })
  })

  afterEach(() => {
    jest.clearAllMocks() // Reset all mocks after each test to prevent state leaks
  })

  it('Calls the signup function when submitting the form', async () => {
    render(<AuthPage />) // Render the AuthPage component
    const email = faker.internet.email() // Generate a fake email address
    const password = faker.internet.password() // Generate a fake password

    // Simulate user interactions
    fireEvent.click(screen.getByText('buttons.register_now')) // Click on "Register Now" to open the registration form
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: email } }) // Fill in the email field
    fireEvent.change(screen.getByLabelText('form.password'), { target: { value: password } }) // Fill in the password field
    fireEvent.click(screen.getByRole('button', { name: 'buttons.register' })) // Submit the registration form

    // Check if the signup function was called with the correct parameters
    await waitFor(() => {
      expect(useAuth().signup).toHaveBeenCalledWith({
        email,
        password,
      })
    })
  })

  it('Calls the Google login function', () => {
    render(<AuthPage />) // Render the AuthPage component
    fireEvent.click(screen.getByText('buttons.register_now')) // Open the registration form
    fireEvent.click(screen.getByText('buttons.login_with_google')) // Simulate Google login button click

    // Verify that the Google login function was called
    expect(useAuth().loginGoogle).toHaveBeenCalled()
  })

  it('Calls the GitHub login function', () => {
    render(<AuthPage />) // Render the AuthPage component
    fireEvent.click(screen.getByText('buttons.register_now')) // Open the registration form
    fireEvent.click(screen.getByText('buttons.login_with_github')) // Simulate GitHub login button click

    // Verify that the GitHub login function was called
    expect(useAuth().loginGithub).toHaveBeenCalled()
  })

  it('Renders the registration form correctly', () => {
    const { t } = useTranslation() // Use the translation hook
    render(<AuthPage />) // Render the AuthPage component

    fireEvent.click(screen.getByText(t('buttons.register_now'))) // Open the registration form

    // Verify that the registration form contains the necessary elements
    expect(screen.getByText('buttons.sign_in')).toBeInTheDocument() // Check for "Sign In" button
    expect(screen.getByRole('button', { name: t('buttons.register') })).toBeInTheDocument() // Check for "Register" button
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument() // Check for email input field
    expect(screen.getByLabelText(t('form.password'))).toBeInTheDocument() // Check for password input field
  })

  // BUG: The toastify when we try to register an invalid email not showing up
  it.skip('Displays error message for invalid email', async () => {
    render(<AuthPage />) // Render the AuthPage component

    // Simulate user interactions to fill in invalid data
    fireEvent.click(screen.getByText('buttons.register_now')) // Open the registration form
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'emailInvalid' } }) // Fill in an invalid email address
    fireEvent.change(screen.getByLabelText('form.password'), { target: { value: 'password123' } }) // Fill in a password
    fireEvent.click(screen.getByRole('button', { name: 'buttons.register' })) // Submit the form

    // Check if the error toast was displayed
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled() // Verify that the error toast notification was triggered
    })
  })
})
