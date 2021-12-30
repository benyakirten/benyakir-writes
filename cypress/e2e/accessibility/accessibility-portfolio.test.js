/// <reference types="Cypress" />

describe("Portfolio accessibility", () => {
  beforeEach(() => {
    cy.init("/portfolio")
  });

  it("Has no accessibility violations after loading the page", () => {
    cy.checkA11y();
    cy.changeThemeAndCheck();
  });

  it("Has no accessibility violations after browsing through the pagination", () => {
    cy.get("[data-cy=page-flip-right]").eq(0).click();
    cy.checkA11y();

    cy.get("[data-cy=page-flip-left]").eq(0).click();
    cy.checkA11y();

    cy.changeThemeAndCheck();
  });

  it("Has no accessibility violations when the text filter is changed", () => {
    cy.get("[data-cy=text-input]").type("ts");
    cy.wait(300);
    cy.checkA11y();

    cy.changeThemeAndCheck();
  });

  it("Has no accessibility violations when the date is changed", () => {
    cy.get("[data-cy=foldout-dates]").click();
    cy.wait(1000);
    cy.checkA11y();

    cy.get("input[type=date]").eq(0).type("2021-04-01");
    cy.checkA11y();

    cy.get("input[type=date]").eq(1).type("2020-11-01");
    cy.checkA11y();

    cy.changeThemeAndCheck();
  });

  it("Has no accessibility violations when the host is changed", () => {
    cy.get("[data-cy=foldout-host]").click();
    cy.wait(1000);
    cy.checkA11y();

    cy.changeThemeAndCheck();

    cy.get("[data-cy=multiple-choice]").then(() => {
      cy.get("[data-cy=select-netlify]").eq(0).click();
      cy.wait(1000);
      cy.checkA11y();

      cy.changeThemeAndCheck();
    });
  });

  it("Has no accessibility violations when the technology is changed", () => {
    cy.get("[data-cy=foldout-tech]").click();
    cy.wait(1000);
    cy.checkA11y();

    cy.changeThemeAndCheck();

    cy.get("[data-cy=multiple-choice]").then(() => {
      cy.get("[data-cy=select-typescript").eq(0).click();
      cy.wait(1000);
      cy.checkA11y();

      cy.changeThemeAndCheck();
    });
  });
});
