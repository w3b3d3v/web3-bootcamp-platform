/**
 * @jest-environment jsdom
 */
import Footer from './index'
import { render, screen } from '@testing-library/react'
describe('Footer', () => {
  it('should render', () => {
    render(<Footer />)
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  })
})