/**
 * @jest-environment jsdom
 */
import GeneralInfo from './index'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SessionProvider } from 'next-auth/react'

describe('General Info', () => {
    beforeEach(async () => {
        render(
            <SessionProvider session={null}>
                <GeneralInfo />
            </SessionProvider>
        )
    })

    it('should render General Info Card', () => {
        expect(screen.getByTestId('general-info-card')).toBeInTheDocument()
    })

    it('should render Personal Data Inputs as first screen', () => {
        expect(screen.getByText('Nome')).toBeInTheDocument()
        expect(screen.getByText('Email')).toBeInTheDocument()
        expect(screen.getByText('Descreva de maneira breve sua experiência com web3')).toBeInTheDocument()
        expect(screen.getByTestId('change-profile-picture')).toBeInTheDocument()
    })
})