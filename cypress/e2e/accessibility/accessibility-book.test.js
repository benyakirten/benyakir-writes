/// <reference types="Cypress" />

describe("Book accessibility", () => {
	beforeEach(() => {
		cy.init("/author/books");
	});

	it("Has no accessibility violations after loading the page", () => {
		cy.checkA11y();
		cy.changeThemeAndCheck();
	});

	it("Has no accessibility violations when the items per filter is changed", () => {
		cy.get("[data-cy=text-input]").type("automata");
		cy.wait(300);
		cy.checkA11y();

		cy.changeThemeAndCheck();
	});

	it("Has no accessibility violations when the date is changed", () => {
		cy.get("[data-cy=foldout-dates]").click();
		cy.wait(1000);
		cy.checkA11y();

		cy.changeThemeAndCheck();

		cy.get("input[type=date]").eq(0).type("2021-04-01");
		cy.checkA11y();

		cy.get("input[type=date]").eq(1).type("2020-11-01");
		cy.checkA11y();

		cy.changeThemeAndCheck();
	});
});
