
import ComingSoonCard from './index'
import { render, screen } from '@testing-library/react'
describe('ComingSoonCard', () => {
  it('should render', () => {
    render(<ComingSoonCard />)
    expect(screen.getByTestId('coming-soon')).toBeInTheDocument();
  })
})