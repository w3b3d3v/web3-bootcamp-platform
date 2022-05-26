/**
 * @jest-environment jsdom
 */
import Card from './index'
import { render, screen } from '@testing-library/react'
const props = {
  title: 'Está chegando a hora!',
  desc: 'Estamos finalizando os últimos preparativos o evento. Volte para conferir em breve!',
  duration: '1 semana',
  tags: ['solidity', 'ethereum'],
  image: 'https://images.unsplash.com/photo-1589717098126-b9f9f8f8d8b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  difficulty: 'Iniciante',
  id: '1',
  active: true,
}
describe('Card', () => {
  it('should render', () => {
    render(<Card 
      {...props}
    />)
    expect(screen.getByTestId('card')).toBeInTheDocument();
  })
})