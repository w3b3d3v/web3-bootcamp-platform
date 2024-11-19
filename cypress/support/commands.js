// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('register', (email, password) => {
  cy.visit('http://localhost:3000/')
  cy.get('#login').click()
  cy.get('.mt-3 > .cursor-pointer').click()
  cy.get('#email').type(email)
  cy.get('#password').type(password)
  cy.get('.mt-8 > .w-full').click()
})

Cypress.Commands.add('navigateToBuild', (course) => {
  cy.get('[href="/courses"] > .nextui-c-iWjDFM').click()
  cy.get(`#${course} > .nextui-c-kzikkm > .nextui-c-iWjDFM`).click()
})

Cypress.Commands.add('accessLesson', () => {
  cy.get('#signup-cohort').click()
  cy.get(':nth-child(1) > .mt-4 > :nth-child(1) > :nth-child(1) > #access-lesson > .m-0').click()
})

Cypress.Commands.add('submitLesson', ({ text, filePath }) => {
  cy.get('#submit-lesson > .nextui-button-text').click()

  if (filePath) {
    cy.get('#load-file').selectFile(filePath)
    cy.wait(4000)
    cy.get('#upload-file').click()
  } else if (text) {
    cy.get('.mt-2 > .z-10').type(text)
    cy.get('#modal-send-lesson').click()
  }
})

Cypress.Commands.add('validateModalContent', (expectedText) => {
  cy.get('.min-h-screen .pt-5').should('contain', expectedText)
})

Cypress.Commands.add('nextLesson', () => {
  cy.wait(4000)
  cy.get('.nextui-c-iWjDFM-wUUIG-color-secondary').click()
})
