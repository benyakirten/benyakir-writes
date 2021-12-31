/// <reference types="Cypress" />

describe("Static page (about/privacy/contact/theme) accessibility", () => {
  it("Has no accessibility violations after the About page is visited", () => {
    cy.init("/about")
    cy.checkA11y();

    cy.changeThemeAndCheck();
  });

  it("Has no accessibility violations after the Privacy page is visited", () => {
    cy.init("/privacy")
    cy.wait(1000)
    cy.checkA11y();

    cy.changeThemeAndCheck();
  });

  it("Has no accessibility violations after the 404 page is visited", () => {
    cy.init("/404")
    cy.wait(1000)
    cy.checkA11y();

    cy.changeThemeAndCheck();
  });

  describe("Contact page", () => {
    beforeEach(() => {
      cy.init("/contact")
    });

    it("Has no accessibility violations after load", () => {
      cy.checkA11y();
      cy.changeThemeAndCheck();
    });

    it("Has no accessibility vigolations if the form is submitted with an error", () => {
      cy.get("#email").type("test@test.com");
      cy.get("textarea").type("This is a an error message.");
      cy.get("button").eq(1).click();

      cy.wait(1200);

      cy.checkA11y();

      cy.changeThemeAndCheck();
    });

    it("Has no accessibility vigolations if the form is submitted with success", () => {
      cy.intercept("/", { body: "result" });
      cy.get("#email").type("test@test.com");
      cy.get("textarea").type("This is a an error message.");
      cy.get("button[type=submit]").click();

      cy.wait(1200);

      cy.checkA11y();

      cy.changeThemeAndCheck();
    });
  });
});
