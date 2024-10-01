/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react'
import LoginButton from './index'
import '@testing-library/jest-dom'

describe('Test login button', () => {
  it('should render Google login button', () => {
    render(
      <LoginButton
        id={'sign-in-with-google'}
        imgSrc={'/assets/img/google-logo.svg'}
        alt="Google-Login-Icon"
        textContent={'Login com o Google'}
        loginGoogle={() => loginGoogle()}
        imgSize={'40'}
      />
    )
    expect(screen.getByAltText('Login com o Google')).toBeInTheDocument()
  })
  it('should click Google login button', () => {
    const loginGoogle = jest.fn()
    render(
      <LoginButton
        id={'sign-in-with-google'}
        imgSrc={'/assets/img/google-logo.svg'}
        alt="Google-Login-Icon"
        textContent={'Login com o Google'}
        loginGoogle={() => loginGoogle()}
        imgSize={'40'}
      />
    )
    fireEvent.click(screen.getByRole('button'))
    expect(loginGoogle).toHaveBeenCalledTimes(1)
  })
  it('should render Github login button', () => {
    render(
      <LoginButton
        id={'sign-in-with-github'}
        imgSrc={'/assets/img/github-logo.svg'}
        alt="Github-Login-Icon"
        textContent={'Login com o Github'}
        loginGoogle={() => loginGithub()}
        imgSize={'40'}
      />
    )
    expect(screen.getByAltText('Login com o Github')).toBeInTheDocument()
  })
  it('should click Google login button', () => {
    const loginGithub = jest.fn()
    render(
      <LoginButton
        id={'sign-in-with-github'}
        imgSrc={'/assets/img/google-logo.svg'}
        alt="Github-Login-Icon"
        textContent={'Login com o Github'}
        loginGithub={() => loginGithub()}
        imgSize={'40'}
      />
    )
    fireEvent.click(screen.getByRole('button'))
    expect(loginGithub).toHaveBeenCalledTimes(1)
  })

  it('register', () => {})
})
