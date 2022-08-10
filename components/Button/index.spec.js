/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from '.'

describe('<Button/>', () => {
  it('should render button', () => {
    render(<Button />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should render button with custom classes', () => {
    render(<Button customClass={'hyper-text'} />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('hyper-text')
  })

  it('should render button children', () => {
    render(<Button>Texto filho</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent(/texto filho/i)
  })

  it('should call function passed as prop', () => {
    const runFunction = jest.fn()
    render(<Button onClick={runFunction} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(runFunction).toHaveBeenCalledTimes(1)
  })

  it('should have secondary classes', () => {
    render(<Button style={'secondary'} />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('hover:border-primary-400')
  })

  it('should have primary classes when passing it', () => {
    render(<Button style={'primary'} />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('cursor-pointer')
  })

  it('should have primary classes even not passing it', () => {
    render(<Button />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('cursor-pointer')
  })

  it('should not have pointer cursor when disabled', () => {
    render(<Button disabled />)
    const button = screen.getByRole('button')
    expect(button).not.toHaveClass('cursor-pointer')
  })
})
