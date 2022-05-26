
import ThemeSwitch from './index'
import { render, screen } from '@testing-library/react'

const setTheme = jest.fn()

describe('ThemeSwitch', () => {

  it('should render', () => {
    render(<ThemeSwitch />)
    expect(screen.getByTestId('theme-switch-button')).toBeInTheDocument();
  })

  it('should change themes', async () => {
    //yet to be done
  })
})
