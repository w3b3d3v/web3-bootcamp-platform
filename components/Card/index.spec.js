/**
 * @jest-environment jsdom
 */
import Card from './index'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const props = {
  title: 'Está chegando a hora!',
  desc: 'Estamos finalizando os últimos preparativos o evento. Volte para conferir em breve!',
  duration: '1 semana',
  tags: ['solidity', 'ethereum'],
  difficulty: 'A definir',
  id: '1',
  active: false,
}
const notActiveClass = 'cursor-default select-none opacity-60 dark:opacity-50'

describe('Card', () => {
  it('should render', () => {
    render(<Card {...props} />)
    expect(screen.getByTestId('card')).toBeInTheDocument()
  })
  it('should render only active courses', () => {
    props.active = true
    render(<Card {...props} />)
    expect(screen.getByTestId('card')).not.toHaveClass(notActiveClass)
  })
  it("should render placeholder if there's no duration set on course", () => {
    props.duration = ''
    render(<Card {...props} />)
    expect(screen.getByTestId('card')).toHaveTextContent('Em breve...')
  })
  it('should display default difficulty level', () => {
    render(<Card {...props} />)
    expect(screen.getByTestId('difficulty-level')).toHaveTextContent('A definir')
  })
  it('should display Iniciante difficulty level', () => {
    props.difficulty = 'Iniciante'
    render(<Card {...props} />)
    expect(screen.getByTestId('difficulty-level')).toHaveTextContent('Iniciante')
  })
  it('should display Intermediário difficulty level', () => {
    props.difficulty = 'Intermediário'
    render(<Card {...props} />)
    expect(screen.getByTestId('difficulty-level')).toHaveTextContent('Intermediário')
  })
  it('should display Avançado difficulty level', () => {
    props.difficulty = 'Avançado'
    render(<Card {...props} />)
    expect(screen.getByTestId('difficulty-level')).toHaveTextContent('Avançado')
  })
})
