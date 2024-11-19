const { faker } = require('@faker-js/faker')

describe('Course Workflow', () => {
  const email = faker.internet.email()
  const password = faker.internet.password()

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('Completes the course workflow', () => {
    const submissionText = faker.lorem.sentences(2, '\n')
    cy.register(email, password)
    cy.navigateToBuild('Rust_State_Machine')
    cy.accessLesson()

    cy.wait(4000)
    cy.submitLesson({ text: submissionText })
    cy.nextLesson()

    cy.wait(4000)
    cy.submitLesson({ filePath: 'public/assets/img/screenshot-home-build.png' })
    cy.validateModalContent(
      'Networking is everything, how about sharing your progress with your friends on Twitter?'
    )
    cy.get('#modal-cancel-button').click()
    cy.nextLesson()
  })
})
