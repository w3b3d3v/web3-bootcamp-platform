/**
 * @jest-environment jsdom
 */
import { Button } from './index'
import { render, screen } from '@testing-library/react'
describe('Button', () => {
  it('should render', () => {
    render(<Button />)
    expect(screen.getByTestId('button')).toBeInTheDocument()
  })
  it('should use custom class', () => {
    render(<Button customClass="custom" />)
    expect(screen.getByTestId('button')).toHaveClass('custom')
  })
  it('should be disabled by props', () => {
    render(<Button disabled />)
    expect(screen.getByTestId('button')).toHaveProperty('disabled', true)
  })
})