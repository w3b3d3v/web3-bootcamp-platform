/**
 * @jest-environment jsdom
 */
import GeneralInfo from '../index'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils'

describe('Personal Data', () => {
  beforeEach(async () => {
    render(<GeneralInfo />)
  })

  it('should receive data input correctly', async () => {
    fireEvent.input(screen.getByPlaceholderText('Nome'), {
      target: {
        value: 'Zé do alho',
      },
    })
    expect(screen.getByPlaceholderText('Nome')).toHaveValue('Zé do alho')
    fireEvent.input(screen.getByPlaceholderText('Email'), {
      target: {
        value: 'exemplo@gmail.com',
      },
    })
    expect(screen.getByPlaceholderText('Email')).toHaveValue('exemplo@gmail.com')
    fireEvent.input(screen.getByPlaceholderText('Escreva um resumo sobre você'), {
      target: {
        value: 'Eu sou um desenvolvedor',
      },
    })
    expect(screen.getByPlaceholderText('Escreva um resumo sobre você')).toHaveValue(
      'Eu sou um desenvolvedor'
    )
  })

  it('should throw yup error on saving without name', async () => {
    expect(screen.getByRole('button', { name: /salvar/i }))
    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /salvar/i }))
    })
    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
  })

  it('should throw yup error on saving name but without email', async () => {
    fireEvent.input(screen.getByPlaceholderText('Nome'), {
      target: {
        value: 'Zé do alho',
      },
    })
    expect(screen.getByPlaceholderText('Nome')).toHaveValue('Zé do alho')
    expect(screen.getByRole('button', { name: /salvar/i }))
    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /salvar/i }))
    })
    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
  })

  it('should throw yup error on saving email but without name', async () => {
    fireEvent.input(screen.getByPlaceholderText('Email'), {
      target: {
        value: 'exemplo@gmail.com',
      },
    })
    expect(screen.getByPlaceholderText('Email')).toHaveValue('exemplo@gmail.com')
    expect(screen.getByRole('button', { name: /salvar/i }))
    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /salvar/i }))
    })
    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
  })

  it('should save profile data correctly if name and email are filled but bio is not ', async () => {
    fireEvent.input(screen.getByPlaceholderText('Nome'), {
      target: {
        value: 'Zé do alho',
      },
    })
    expect(screen.getByPlaceholderText('Nome')).toHaveValue('Zé do alho')
    fireEvent.input(screen.getByPlaceholderText('Email'), {
      target: {
        value: 'exemplo@gmail.com',
      },
    })
    expect(screen.getByPlaceholderText('Email')).toHaveValue('exemplo@gmail.com')
    expect(screen.getByRole('button', { name: /salvar/i }))
    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /salvar/i }))
    })
    expect(screen.queryByText('Nome é obrigatório')).not.toBeInTheDocument()
    expect(screen.queryByText('Email é obrigatório')).not.toBeInTheDocument()
  })
})
