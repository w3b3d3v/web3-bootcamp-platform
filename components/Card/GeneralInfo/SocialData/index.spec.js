/**
 * @jest-environment jsdom
 */
import GeneralInfo from '../index'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils'
import { SessionProvider } from 'next-auth/react'

describe('Social Data', () => {
    beforeEach(async () => {
        render(
            <SessionProvider session={null}>
                <GeneralInfo />
            </SessionProvider>
        )
    })

    it('should render Social Data on click Next', () => {
        expect(screen.getByTestId('social-data')).toBeInTheDocument()
    })

    it('should render Social Data Inputs', () => {
        expect(screen.getByPlaceholderText('https://twitter.com/username')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('https://linkedin.com/username')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('https://mysite.com')).toBeInTheDocument()

        //since there's no user, github will be a connect-github button
        expect(screen.getByTestId('github-connect-button')).toBeInTheDocument()
    })

    it('should save form with input having empty string values', async () => {
        expect(screen.getByRole('button', { name: /salvar/i }))
        await act(async () => {
            fireEvent.submit(screen.getByRole('button', { name: /salvar/i }))
        })
    })
})
