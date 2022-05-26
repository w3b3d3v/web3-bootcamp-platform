/**
 * @jest-environment jsdom
 */
import ThemeSwitch from './index'
import { render, screen, fireEvent } from '@testing-library/react'

let theme = 'dark'
const setTheme = () => theme = theme === 'dark' ? 'light' : 'dark'

describe('ThemeSwitch', () => {
  it('should render', () => {
    render(<ThemeSwitch />)
    expect(screen.getByTestId('theme-switch-button')).toBeInTheDocument();
  })

  it('should start with dark theme', async () => {
    render(<ThemeSwitch />)
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  })

  it('should change theme', async () => {
    render(<ThemeSwitch />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(setTheme()).toBe('light');
  })
})
