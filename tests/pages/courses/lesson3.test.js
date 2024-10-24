/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'
import Lessons from '../../../pages/courses/[id]/[section]/[lesson]'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
// Mock das dependências
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}))

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}))

jest.mock('../../../hooks/route', () => ({
  withProtected: (component) => component,
}))

// Mock dos dados do curso e da lição
const mockCourse = {
  id: '1',
  title: 'Curso de Teste',
  metadata: {
    pt: {
      sections: {
        section1: [
          { file: 'lesson1', title: 'Lição 1' },
          { file: 'lesson2', title: 'Lição 2' },
        ],
      },
    },
  },
}

const mockContent = '# Conteúdo da Lição'

describe('Componente Lessons', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
    }))
    useTranslation.mockImplementation(() => ({
      t: (key) => key,
      i18n: { resolvedLanguage: 'pt' },
    }))
  })

  it('renderiza o conteúdo da lição corretamente', () => {
    render(
      <Lessons
        course={mockCourse}
        section="section1"
        lesson="lesson1"
        content={mockContent}
        currentDate="2023-05-10T00:00:00.000Z"
      />
    )
    expect(screen.getByText('Vini 1')).toBeInTheDocument()
  })

  it('botão "Próxima Lição" navega para a próxima lição', async () => {
    const pushMock = jest.fn()
    useRouter.mockImplementation(() => ({
      push: pushMock,
    }))
    render(
      <Lessons
        course={mockCourse}
        section="section1"
        lesson="lesson1"
        content={mockContent}
        currentDate="2023-05-10T00:00:00.000Z"
      />
    )
    fireEvent.click(screen.getAllByText('lesson.nextLesson')[0])
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('messages.exercise_not_submitted')
    })
    // Simular que a lição foi enviada
    fireEvent.click(screen.getByText('submissionTitle'))
    fireEvent.click(screen.getAllByText('lesson.nextLesson')[0])
    expect(pushMock).toHaveBeenCalledWith('/courses/1/section1/lesson2?lang=pt')
  })
  
  it('botão "Lição Anterior" exibe mensagem de erro na primeira lição', () => {
    render(
      <Lessons
        course={mockCourse}
        section="section1"
        lesson="lesson1"
        content={mockContent}
        currentDate="2023-05-10T00:00:00.000Z"
      />
    )
    fireEvent.click(screen.getAllByText('lesson.previousLesson')[0])
    expect(toast.error).toHaveBeenCalledWith('messages.already_on_first_lesson')
  })
  
  it('botão "Voltar ao Curso" navega para a página do curso', () => {
    const pushMock = jest.fn()
    useRouter.mockImplementation(() => ({
      push: pushMock,
    }))
    render(
      <Lessons
        course={mockCourse}
        section="section1"
        lesson="lesson1"
        content={mockContent}
        currentDate="2023-05-10T00:00:00.000Z"
      />
    )
    fireEvent.click(screen.getAllByText('lesson.backToCourse')[0])
    expect(pushMock).toHaveBeenCalledWith('/courses/1')
  })
})
