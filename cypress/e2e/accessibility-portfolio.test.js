describe("Portfolio accessibility", () => {
    beforeEach(() => {
        cy.visit("/portfolio").get("main").injectAxe();
    });

    it('Has no accessibility violations after loading the page', () => {
        cy.checkA11y();
    })
})