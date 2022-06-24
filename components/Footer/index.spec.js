import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from './index'

describe('<Footer />', () => {
  it('should render Footer', () => {
    render(<Footer />)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })
  it('should render web3dev link', () => {
    render(<Footer />)
    expect(screen.getByTestId('web3dev-link')).toBeInTheDocument()
  })
  it('should render buildpsace link', () => {
    render(<Footer />)
    expect(screen.getByTestId('buildspace-link')).toBeInTheDocument()
  })
})
