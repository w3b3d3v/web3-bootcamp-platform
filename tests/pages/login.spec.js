/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import AuthPage from '../../pages/auth'
import useAuth from '../../hooks/useAuth'
import { faker } from '@faker-js/faker';
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify';

// Mock dependencies
jest.mock('../../hooks/useAuth')
jest.mock('react-toastify')
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
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
}))

describe('Testing the login page', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      login: jest.fn(),
      loginGoogle: jest.fn(),
      loginGithub: jest.fn(),
    })
  })

  it('Call the login function when submitting the form', async () => {
    render(<AuthPage />)
    const email = faker.internet.email()
    const password = faker.internet.password()

    // Fill in the form
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: email } })
    fireEvent.change(screen.getByLabelText('form.password'), { target: { value: password  } })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'buttons.log_in' }))

    await waitFor(() => {
      expect(useAuth().login).toHaveBeenCalledWith({
        email: email,
        password: password,
      })
    })
  })

  it('Call the Google login function', () => {
    render(<AuthPage />)

    fireEvent.click(screen.getByText('buttons.login_with_google'))
    
    expect(useAuth().loginGoogle).toHaveBeenCalled()
  })

  it('Call the GitHub login function', () => {
    render(<AuthPage />)

    fireEvent.click(screen.getByText('buttons.login_with_github'))
    
    expect(useAuth().loginGithub).toHaveBeenCalled()
  })

  it('Render the login form', () => {
    const { t } = useTranslation();
    render(<AuthPage />)

    expect(screen.getByRole('button', { name: t('buttons.log_in') })).toBeInTheDocument()
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
    expect(screen.getByLabelText(t('form.password'))).toBeInTheDocument()
  })

  // TODO: The toastify when we try to login with an invalid email not showing up
  // it('Display error message for invalid email', async () => {
  //   render(<AuthPage />)

  //   // Fill in the form with an invalid email address
  //   fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'emailInvalid' } })
  //   fireEvent.change(screen.getByLabelText('form.password'), { target: { value: 'password123' } })

  //   // Submit the form
  //   fireEvent.click(screen.getByRole('button', { name: 'buttons.log_in' }))

  //   await waitFor(() => {
  //     expect(toast.error).toHaveBeenCalled()
  //   })
  // })
})