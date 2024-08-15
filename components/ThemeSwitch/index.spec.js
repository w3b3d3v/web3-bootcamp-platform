/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ThemeSwitch from '.'

describe('<Navbar />', () => {
    it('should render Navbar', () => {
        render(<ThemeSwitch />)
        expect(screen.getByTestId('ThemeSwitch')).toBeInTheDocument()
    })
})
