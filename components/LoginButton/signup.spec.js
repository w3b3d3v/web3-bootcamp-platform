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

// Mock das dependências
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

describe('Testing the signup page', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      signup: jest.fn(),
      loginGoogle: jest.fn(),
      loginGithub: jest.fn(),
    })
  })

  it('Call the signup function when submitting the form', async () => {
    render(<AuthPage />)
    const email = faker.internet.email()
    const password = faker.internet.password()

    // Muda para o modo de registro
    fireEvent.click(screen.getByText('buttons.register_now'))

    // Preenche o formulário
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: email } })
    fireEvent.change(screen.getByLabelText('form.password'), { target: { value: password  } })

    // Submete o formulário
    fireEvent.click(screen.getByRole('button', { name: 'buttons.register' }))

    await waitFor(() => {
      expect(useAuth().signup).toHaveBeenCalledWith({
        email: email,
        password: password,
      })
    })
  })

  it('Call the Google login function', () => {
    render(<AuthPage />)

    // Muda para o modo de registro
    fireEvent.click(screen.getByText('buttons.register_now'))

    fireEvent.click(screen.getByText('buttons.login_with_google'))
    
    expect(useAuth().loginGoogle).toHaveBeenCalled()
  })

  it('Call the GitHub login function', () => {
    render(<AuthPage />)

    // Muda para o modo de registro
    fireEvent.click(screen.getByText('buttons.register_now'))

    fireEvent.click(screen.getByText('buttons.login_with_github'))
    
    expect(useAuth().loginGithub).toHaveBeenCalled()
  })

  it('Render the registration form', () => {
    const { t } = useTranslation();
    render(<AuthPage />)
    
    // Muda para o modo de registro
    fireEvent.click(screen.getByText(t('buttons.register_now')))

    expect(screen.getByRole('button', { name: t('buttons.register') })).toBeInTheDocument()
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
    expect(screen.getByLabelText(t('form.password'))).toBeInTheDocument()
  })

  // it('Display error message for invalid email', async () => {
  //   render(<AuthPage />)

  //   // Muda para o modo de registro
  //   fireEvent.click(screen.getByText('buttons.register_now'))

  //   // Preenche o formulário com email inválido
  //   fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'emailInvalid' } })
  //   fireEvent.change(screen.getByLabelText('form.password'), { target: { value: 'password123' } })

  //   // Submete o formulário
  //   fireEvent.click(screen.getByRole('button', { name: 'buttons.register' }))

  //   await waitFor(() => {
  //     expect(toast.error).toHaveBeenCalled()
  //   })
  // })
})