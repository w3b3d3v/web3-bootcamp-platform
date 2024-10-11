/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from './index'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str) => str, // Mock translation function that returns the input string
    i18n: { changeLanguage: jest.fn() }, // Mock function for changing languages
  }),
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('<Footer />', () => {
  it('should render Footer', () => {
    jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
      pathname: '/',
    }))
    render(<Footer />)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should render web3dev link on course pages', () => {
    jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
      pathname: '/courses/some-course',
    }))
    render(<Footer />)
    expect(screen.getByTestId('web3dev-link')).toBeInTheDocument()
  })

  it('should render buildspace link only on course pages', () => {
    jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
      pathname: '/courses/some-course',
    }))
    render(<Footer />)
    expect(screen.getByTestId('buildspace-link')).toBeInTheDocument()
  })

  it('should not render buildspace link on non-course pages', () => {
    jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
      pathname: '/',
    }))
    render(<Footer />)
    expect(screen.queryByTestId('buildspace-link')).not.toBeInTheDocument()
  })

  it('should render social links on all pages', () => {
    jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
      pathname: '/',
    }))
    render(<Footer />)
    const socialLinks = [
      'twitter',
      'discord',
      'github',
      'linkedin',
      'youtube',
      'forum',
      'manual',
      'glossary',
    ]
    socialLinks.forEach((link) => {
      expect(screen.getByAltText(`${link} icon`)).toBeInTheDocument()
    })
  })
})
