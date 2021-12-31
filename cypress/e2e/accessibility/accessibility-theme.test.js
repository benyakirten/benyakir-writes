/// <reference types="Cypress" />

describe('Theme page', () => {
  beforeEach(() => {
    cy.init("/theme")
  })

  it('Has no accessiblity violations after the page is visited', () => {
    cy.checkA11y();
    cy.changeThemeAndCheck();
  });

  it('Has no accessibility violations after a theme is highlighted', () => {
    cy.get('ul[data-cy=all-themes-list]').children().first().click()
    cy.wait(1000)

    cy.checkA11y();
    cy.changeThemeAndCheck();
  });

  it("Has no accessibility violations after both menus are closed", () => {
    cy.get('ul[data-cy=all-themes-list]').children().first().click()
    cy.wait(1000)

    cy.get('span[data-cy=theme-open-general]').click()
    cy.wait(1000)
    cy.checkA11y()

    cy.get('span[data-cy=theme-open-general]').click()
    cy.wait(1000)

    cy.get('span[data-cy=theme-open-modify]').click()
    cy.wait(1000)
    cy.checkA11y()
  })
})