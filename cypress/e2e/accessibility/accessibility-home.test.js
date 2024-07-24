/// <reference types="Cypress" />

describe("Home page", () => {
	beforeEach(() => {
		cy.init("/");
	});

	it("Has no detectable accessibility violations on load", () => {
		cy.checkA11y();
	});

	describe("the side menu", () => {
		beforeEach(() => {
			cy.get("[data-cy=open-sidemenu]").click();
			cy.wait(1000);
		});

		it("Has no accessibility violations after the side menu is opened", () => {
			cy.checkA11y();
		});

		it("has no accessibility violations when changing the theme", () => {
			cy.get("[data-cy=sidebar-theme-toggle]").click();
			cy.wait(1000);
			cy.checkA11y();
		});

		it("Has no accessibility violations when the blog sub menu is opened", () => {
			cy.get("[data-cy=foldout-bar]").eq(0).click();
			cy.wait(1000);
			cy.checkA11y();

			cy.get("[data-cy=sidebar-theme-toggle]").click();
			cy.wait(1000);
			cy.checkA11y();
		});

		it("Has no accessibility violations when the author sub menu is opened", () => {
			cy.get("[data-cy=foldout-bar]").eq(1).click();
			cy.wait(1000);
			cy.checkA11y();

			cy.get("[data-cy=sidebar-theme-toggle]").click();
			cy.wait(1000);
			cy.checkA11y();
		});

		it("Has no accessibility violations when the search menu is opened", () => {
			cy.get("[data-cy=foldout-bar]").eq(2).click();
			cy.wait(1000);
			cy.checkA11y();
		});

		it("Has no accessibility violations when the search menu is opened with the other color theme", () => {
			cy.get("[data-cy=sidebar-theme-toggle]").click();
			cy.wait(1000);
			cy.checkA11y();

			cy.get("[data-cy=foldout-bar]").eq(2).click();
			cy.wait(1000);
			cy.checkA11y();
		});

		it("Has no accessibility violations when searches are performed", () => {
			cy.get("[data-cy=foldout-bar]").eq(2).click();
			cy.wait(1000);
			cy.get("[data-cy=search-text-input]").type("a", { force: true });
			cy.wait(2000);
			cy.checkA11y();
		});

		it("Has no accessibility violations when searches are performed with the other color the,e", () => {
			cy.get("[data-cy=sidebar-theme-toggle]").click();
			cy.wait(1000);
			cy.checkA11y();

			cy.get("[data-cy=foldout-bar]").eq(2).click();
			cy.wait(1000);
			cy.get("[data-cy=search-text-input]").type("a", { force: true });
			cy.wait(2000);
			cy.checkA11y();
		});
	});
});
