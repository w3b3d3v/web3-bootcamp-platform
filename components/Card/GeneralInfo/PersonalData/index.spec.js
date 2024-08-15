/**
 * @jest-environment jsdom
 */
import GeneralInfoCard from '../index'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils'
import { SessionProvider } from 'next-auth/react'

describe('Personal Data', () => {
  beforeEach(async () => {
    render(
      <SessionProvider session={null}>
        <GeneralInfoCard />
      </SessionProvider>
    )
  })

  it('should receive data input correctly', async () => {
    const nameInput = screen.getByLabelText('Nome')
    fireEvent.change(nameInput, {
      target: {
        value: 'Zé do alho',
      },
    });
    expect(nameInput).toHaveValue('Zé do alho')

    const emailInput = screen.getByLabelText('Email')
    fireEvent.input(emailInput, {
      target: {
        value: 'exemplo@gmail.com',
      },
    })
    expect(emailInput).toHaveValue('exemplo@gmail.com')

    const bioInput = screen.getByLabelText('Descreva de maneira breve sua experiência com web3')
    fireEvent.input(bioInput, {
      target: {
        value: 'Eu sou um desenvolvedor',
      },
    })
    expect(bioInput).toHaveValue('Eu sou um desenvolvedor')
  })

  it('should throw yup error on saving without name', async () => {
    expect(screen.getByRole('button', { name: /salvar/i }))
    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /salvar/i }))
    })
    expect(screen.getAllByText('This field is required')[0]).toBeInTheDocument()
  })

  it('should throw yup error on saving email but without name', async () => {
    const emailInput = screen.getByLabelText('Email')
    fireEvent.change(emailInput, {
      target: {
        value: 'exemplo@gmail.com',
      },
    })
    expect(emailInput).toHaveValue('exemplo@gmail.com')
    expect(screen.getByRole('button', { name: /salvar/i }))
    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /salvar/i }))
    })
    expect(screen.getAllByText('This field is required')[0]).toBeInTheDocument()
  })
})
