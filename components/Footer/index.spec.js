/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from './index'
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { }),
      },
    }
  },
}))

describe('<Footer />', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/courses',
    }))
  })

  it('should render Footer', () => {
    render(<Footer />)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('should render web3dev link', () => {
    render(<Footer />)
    expect(screen.getByTestId('web3dev-link')).toBeInTheDocument()
  })

  it('should render buildspace link', () => {
    render(<Footer />)
    expect(screen.getByTestId('buildspace-link')).toBeInTheDocument()
  })
})