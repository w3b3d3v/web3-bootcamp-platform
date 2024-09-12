/**
 * @jest-environment jsdom
 */

import IssueCard from './index'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const issue = {
  createdAt: '2024-06-25T17:29:09Z',
  project_name: 'Stellar Study Group [Core]',
  title: 'title task',
  body: 'body card test issue',
  fields: [
    {
      field: 'Skill',
      value: 'react',
    },
    {
      field: 'Business Unity',
      value: 'WEB3TASK',
    },
    {
      field: 'Context Depth',
      value: 'Intermediate',
    },
    {
      field: 'Importance',
      value: 'medium',
    },
    {
      field: 'Reward',
      value: 'XP',
    },
    {
      field: 'Amount',
      value: 2500,
    },
  ],
}

const userAuth = {
  contextLevel: 'Intermediate',
}

describe('IssueCard', () => {
  beforeEach(async () => {
    render(<IssueCard key={issue.github_id} issue={issue} user={userAuth} />)
  })

  it('should render', () => {
    expect(screen.getByTestId('cardIssue')).toBeInTheDocument()
  })

  it('should render the task information', () => {
    expect(screen.getByText('6/25/2024')).toBeInTheDocument()
    expect(screen.getByText('Stellar Study Group [Core]')).toBeInTheDocument()
    expect(screen.getByText('title task')).toBeInTheDocument()
    expect(screen.getByText('body card test issue')).toBeInTheDocument()
    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.getByText('WEB3TASK')).toBeInTheDocument()
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
    expect(screen.getByText('medium')).toBeInTheDocument()
    expect(screen.getByText('XP')).toBeInTheDocument()
    expect(screen.getByText('2500')).toBeInTheDocument()
  })

  it('should have the opacity-50 class when the user has a context smaller than the task', () => {
    userAuth.contextLevel = 'Beginner'
    const { container } = render(<IssueCard key={issue.github_id} issue={issue} user={userAuth} />)
    const divElement = container.querySelector('div')
    expect(divElement).toHaveClass('order-5 opacity-50')
  })

  it('should not have the opacity-50 class when the user has a context smaller than the task', () => {
    userAuth.contextLevel = 'Expert'
    const { container } = render(<IssueCard key={issue.github_id} issue={issue} user={userAuth} />)
    const divElement = container.querySelector('div')
    expect(divElement).not.toHaveClass('order-5 opacity-50')
  })
})
