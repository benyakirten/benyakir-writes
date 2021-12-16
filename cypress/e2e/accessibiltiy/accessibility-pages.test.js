describe("Static page (about/privacy/contact) accessibility", () => {    
    it("Has no accessibility violations after the About page is visited", () => {
        cy.visit("/about").get("main").injectAxe();
        cy.checkA11y();

        cy.openAndChangeTheme();
    })

    it("Has no accessibility violations after the Privacy page is visited", () => {
        cy.visit("/privacy").get("main").injectAxe();
        cy.checkA11y();

        cy.openAndChangeTheme();
    })

    it("Has no accessibility violatiosn after the 404 page is visited", () => {
        cy.visit("/404").get("main").injectAxe();
        cy.checkA11y();

        cy.openAndChangeTheme();
    })

    describe("Contact page", () => {
        beforeEach(() => {
            cy.visit("/contact").get("main").injectAxe();
        })

        it("Has no accessibility violations after load", () => {
            cy.checkA11y();
            cy.openAndChangeTheme();
        })

        it("Has no accessibility vigolations if the form is submitted with an error", () => {
            cy.get("#email").type("test@test.com")
            cy.get("textarea").type("This is a an error message.")
            cy.get("button").eq(1).click()

            cy.wait(1200)

            cy.checkA11y();

            cy.openAndChangeTheme();
        })

        it("Has no accessibility vigolations if the form is submitted with success", () => {
            cy.intercept("/", { body: "result" })
            cy.get("#email").type("test@test.com")
            cy.get("textarea").type("This is a an error message.")
            cy.get("button[type=submit]").click()

            cy.wait(1200)

            cy.checkA11y();

            cy.openAndChangeTheme();
        })
    })
})