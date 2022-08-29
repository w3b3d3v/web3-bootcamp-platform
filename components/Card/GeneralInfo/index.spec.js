/**
 * @jest-environment jsdom
 */
import GeneralInfo from './index'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('General Info', () => {
  beforeEach(() => {
    render(<GeneralInfo />)
  })
  it('should render General Info Card', () => {
    expect(screen.getByTestId('general-info-card')).toBeInTheDocument()
  })

  it('should render Personal Data Inputs as first screen', () => {
    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Escreva um resumo sobre você')).toBeInTheDocument()
    expect(screen.getByTestId('change-profile-picture')).toBeInTheDocument()
  })
})
