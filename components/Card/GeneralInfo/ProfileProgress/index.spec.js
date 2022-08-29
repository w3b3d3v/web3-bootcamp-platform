/**
 * @jest-environment jsdom
 */
import ProfileProgress from './index'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Profile Progress', () => {
  it('should render Profile Progress', () => {
    render(<ProfileProgress />)
    expect(screen.getByTestId('profile-progress')).toBeInTheDocument()
  })

  it('should display Icon fill property as currentColor if props are false', () => {
    render(<ProfileProgress />)
    expect(screen.getByTestId('personal-data-icon').getAttribute('fill')).toBe('currentColor')
    expect(screen.getByTestId('social-data-icon').getAttribute('fill')).toBe('currentColor')
    expect(screen.getByTestId('professional-data-icon').getAttribute('fill')).toBe('currentColor')
  })

  it('should change Icon fill property to #4CE310 when props are true', () => {
    render(<ProfileProgress filledPersonalData filledSocialData filledProfessionalData />)
    expect(screen.getByTestId('personal-data-icon').getAttribute('fill')).toBe('#4CE310')
    expect(screen.getByTestId('social-data-icon').getAttribute('fill')).toBe('#4CE310')
    expect(screen.getByTestId('professional-data-icon').getAttribute('fill')).toBe('#4CE310')
  })
})
