/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import AuthPage from '../../../pages/auth'
import useAuth from '../../../hooks/useAuth'
import { useTranslation } from 'react-i18next'
import { faker } from '@faker-js/faker'
import { act } from 'react'
import { toast } from 'react-toastify'

// Mock das dependências
jest.mock('../../../hooks/useAuth')
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

describe('Testing the signIn page', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      signup: jest.fn(),
      loginGoogle: jest.fn(),
      loginGithub: jest.fn(),
    })
  })

  it('Render the login form', () => {
    const { t } = useTranslation()
    render(<AuthPage />)

    expect(screen.getByText('buttons.register_now')).toBeInTheDocument()
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
    expect(screen.getByLabelText(t('form.password'))).toBeInTheDocument()
    expect(screen.getByText('buttons.log_in')).toBeInTheDocument()
  })

  it('Runs the login function with the correct data', async () => {
    const mockLogin = jest.fn()
    useAuth.mockReturnValue({ login: mockLogin })
    const email = faker.internet.email()
    const password = faker.internet.password()

    render(<AuthPage />)

    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: email } })
    fireEvent.change(screen.getByLabelText('form.password'), { target: { value: password } })
    fireEvent.click(screen.getByText('buttons.log_in'))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: email,
        password: password,
      })
    })
  })

  // BUG: Toastify isn't showing up
  it.skip('Display error message for empty fields', async () => {
    const { getByText } = render(<AuthPage />)

    await act(async () => {
      fireEvent.click(getByText('buttons.log_in'))
    })

    expect(toast.error).toHaveBeenCalled()
  })

  it('Toggles between login and registration', () => {
    render(<AuthPage />)

    expect(screen.getByText('buttons.register_now')).toBeInTheDocument()

    fireEvent.click(screen.getByText('buttons.register_now'))

    expect(screen.getByText('buttons.sign_in')).toBeInTheDocument()

    fireEvent.click(screen.getByText('buttons.sign_in'))

    expect(screen.getByText('buttons.register_now')).toBeInTheDocument()
  })
})
