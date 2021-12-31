/// <reference types="Cypress" />

describe("Post template", () => {
  it("Has no accessibility violations", () => {
    cy.init("/project/benyakir-writes")

    cy.changeThemeAndCheck();
  });
});

describe("Book template", () => {
  it("Has no accessibility violations", () => {
    cy.init("/book/delusions-of-form")
    cy.checkA11y();

    cy.changeThemeAndCheck();
  });
});

describe("Shortstory template", () => {
  it("Has no accessibility violations", () => {
    cy.init("/story/the-human-error")
    cy.checkA11y();

    cy.changeThemeAndCheck();
  });
});

describe("Blog post template", () => {
  it("Has no accessibility violations", () => {
    cy.init("/post/a-weeks-worth-backend-with-graphql-and-django")
    cy.checkA11y();

    cy.changeThemeAndCheck();
  });
});
