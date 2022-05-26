/**
 * @jest-environment jsdom
 */
import { Button } from './index'
import { render, screen } from '@testing-library/react'
const primaryButton = 
    `text-black-300 dark:text-white-100 font-medium border-transparent rounded-lg bg-primary-300 px-4 py-3 text-sm transition duration-150 ease-in-out `;

  const secondaryButton = 
    ` bg-transparent font-medium rounded-lg px-4 py-3 cursor-pointer border-2 border-primary-300 text-sm text-primary-300 transition duration-150 ease-in-out hover:border-primary-400 hover:text-primary-400`;

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
  it('should have primary style', () => {
    render(<Button style={'primary'} />)
    expect(screen.getByTestId('button')).toHaveClass(primaryButton)
  })
  it('should have secondary style', () => {
    render(<Button style={'secondary'} />)
    expect(screen.getByTestId('button')).toHaveClass(secondaryButton)
  })
})
