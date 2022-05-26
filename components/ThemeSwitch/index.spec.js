/**
 * @jest-environment jsdom
 */
import ThemeSwitch from './index'
import { render, screen } from '@testing-library/react'

describe('ThemeSwitch', () => {
  it('should render', () => {
    render(<ThemeSwitch />)
    expect(screen.getByTestId('theme-switch-button')).toBeInTheDocument();
  })

  it('should start with light theme', async () => {
    render(<ThemeSwitch />)
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  })
})
