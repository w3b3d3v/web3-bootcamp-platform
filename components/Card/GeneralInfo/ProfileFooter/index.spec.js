/**
 * @jest-environment jsdom
 */
import ProfileFooter from './index'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Profile Progress', () => {
    it('should render Profile Progress', () => {
        render(<ProfileFooter />)
        expect(screen.getByTestId('profile-footer')).toBeInTheDocument()
    })
})