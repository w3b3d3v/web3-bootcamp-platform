const { faker } = require('@faker-js/faker')

describe('Course Workflow', () => {
  const email = faker.internet.email()
  const password = faker.internet.password()

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  const login = () => {
    cy.visit('http://localhost:3000/')
    cy.get('#login').click()
    cy.get('.mt-3 > .cursor-pointer').click()
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('.mt-8 > .w-full').click()
  }

  const navigateToCourse = () => {
    cy.get('[href="/courses"] > .nextui-c-iWjDFM').click()
    cy.get('#Rust_State_Machine > .nextui-c-kzikkm > .nextui-c-iWjDFM').click()
  }

  const accessLesson = () => {
    cy.get('#signup-cohort').click()
    cy.get(':nth-child(1) > .mt-4 > :nth-child(1) > :nth-child(1) > #access-lesson > .m-0').click()
  }

  const submitLesson = ({ text, filePath }) => {
    cy.get('#submit-lesson > .nextui-button-text').click()

    if (filePath) {
      cy.get('#load-file').selectFile(filePath)
      cy.get('#upload-file').click()
    } else if (text) {
      cy.get('.mt-2 > .z-10').type(text)
      cy.get('#modal-send-lesson').click()
    }
  }

  const validateModalContent = (expectedText) => {
    cy.get('.min-h-screen .pt-5').should('contain', expectedText)
  }

  const nextLesson = () => {
    cy.wait(4000)
    cy.get('.nextui-c-iWjDFM-wUUIG-color-secondary').click()
  }

  it('Completes the course workflow', () => {
    const submissonText = faker.lorem.sentences(2, '\n')
    login()
    navigateToCourse()
    accessLesson()

    // Submeter texto
    submitLesson({ text: submissonText })
    nextLesson()

    // Submeter arquivo
    submitLesson({ filePath: 'public/assets/img/screenshot-home-build.png' })
    validateModalContent(
      'Networking is everything, how about sharing your progress with your friends on Twitter?'
    )
    cy.get('#modal-cancel-button').click()
    nextLesson()
  })
})
