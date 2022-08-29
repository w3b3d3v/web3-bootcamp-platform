/**
 * @jest-environment jsdom
 */
import ProfileFooter from './index'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import GeneralInfoCard from '..'
import userEvent from '@testing-library/user-event'

describe('Profile Progress', () => {
  it('should render Profile Progress', () => {
    render(<ProfileFooter />)
    expect(screen.getByTestId('profile-footer')).toBeInTheDocument()
  })

  it('should render ProfileFooter back Button disabled since you can"t go back from the first page', () => {
    render(<GeneralInfoCard />)
    expect(screen.getByTestId('previous-profile-form-step')).toBeDisabled()
  })

  it('should render ProfileFooter next Button disabled since you can"t go further from the last page', async () => {
    render(<GeneralInfoCard />)
    await userEvent.click(screen.getByText('Avançar'))
    await userEvent.click(screen.getByText('Avançar'))
    expect(screen.getByTestId('next-profile-form-step')).toBeDisabled()
  })

  it('should render both ProfileFooters Buttons enabled since in the middle page you can go both back and further', async () => {
    render(<GeneralInfoCard />)
    await userEvent.click(screen.getByText('Avançar'))
    expect(screen.getByTestId('next-profile-form-step')).not.toBeDisabled()
    expect(screen.getByTestId('previous-profile-form-step')).not.toBeDisabled()
  })
})
