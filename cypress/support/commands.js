Cypress.Commands.add('openAndChangeTheme', () => {
  cy.get('[data-cy=open-sidemenu]').click()
  cy.wait(1000)

  cy.get('[data-cy=sidebar-theme-toggle]').click()
  cy.wait(1000)
  cy.checkA11y();
})

Cypress.Commands.add('changeTheme', () => {
  cy.get('[data-cy=sidebar-theme-toggle]').click()
  cy.wait(1000)
  cy.checkA11y();
})

Cypress.Commands.add('changeThemeAndCheck', () => {
  cy.get('[data-cy=open-sidemenu]').click()
  cy.wait(1000)

  cy.get('[data-cy=sidebar-theme-toggle]').click()
  cy.wait(1000)
  
  cy.get('[data-cy=open-sidemenu]').click()
  cy.wait(1000)

  cy.checkA11y();

  cy.get('[data-cy=open-sidemenu]').click()
  cy.wait(1000)

  cy.get('[data-cy=sidebar-theme-toggle]').click()
  cy.wait(1000)

  cy.get('[data-cy=open-sidemenu]').click()
  cy.wait(1000)
})