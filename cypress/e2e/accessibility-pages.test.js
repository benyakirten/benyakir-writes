describe("Static pages accessibility", () => {    
    it("Has no accessibility violations after the About page is visited", () => {
        cy.visit("/about").get("main").injectAxe();
        cy.checkA11y();
    })

    it("Has no accessibility violations after the Privacy page is visited", () => {
        cy.visit("/privacy").get("main").injectAxe();
        cy.checkA11y();
    })

    it("Has no accessibility violations after the Contact page is visited", () => {
        cy.visit("/contact").get("main").injectAxe();
        cy.checkA11y();
    })
})