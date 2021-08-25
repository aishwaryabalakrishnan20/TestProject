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

Cypress.Commands.add('loginToApplication',()=>{
  cy.visit('/')
  cy.get('head title').invoke('text').then((title)=>{
      if(title.includes("Sign in")){
        cy.get("#email", { timeout: 9000 }).clear().type(Cypress.env("email"))
        cy.get("#password", { timeout: 9000 }).clear().type(Cypress.env('password'))
        cy.get("#btn-login").click()
        cy.get("[data-cy=menuItem_admin]", {timeout: 30000}).should('be.visible');
      }
  })
})

Cypress.Commands.add('logoutFromApplication',()=>{
  cy.visit('/')
  cy.get('head title').invoke('text').then((title)=>{
      if(!(title.includes("Sign in"))){
    cy.visit('/');
    cy.wait(6000);
    cy.xpath("//label[text()='Profile']/parent::div").find('svg').click({force:true});
    cy.contains('span','Log out').click({force:true});
    cy.wait(2000);
      }
  })
})