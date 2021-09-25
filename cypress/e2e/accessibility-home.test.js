/// <reference types="Cypress" />

describe("Accessibility tests", () => {
    beforeEach(() => {
        cy.visit("/").get("main").injectAxe();
    });
    
    it("Has no detectable accessibility violations on load", () => {
        cy.checkA11y();
    });

    describe("the side menu", () => {
        beforeEach(() => {
            // The arrow to open the menu is the first button on the screen
            cy.get('button').click()
            cy.waitFor(1000)
        })
        it("Has no accessibility violations after the side menu is opened", () => {
            cy.checkA11y();
        })

        it('Has no accessibility violations when the blog sub menu is opened', () => {
            cy.get("span").eq(0).click()
            cy.wait(1000)
            cy.checkA11y();
        })

        it('Has no accessibility violations when the author sub menu is opened', () => {
            cy.get("span").eq(1).click()
            cy.wait(1000)
            cy.checkA11y();
        })

        it('Has no accessibility violations when the search menu is opened', () => {
            cy.get("span").eq(2).click()
            cy.wait(1000)
            cy.checkA11y();
        })

        it('Has no accessibility violations when searches are performed', () => {
            cy.get("span").eq(2).click()
            cy.wait(1000)
            cy.get("input[type=text]").type("syntax")
            cy.wait(4000)
            cy.checkA11y();
        })
    })

   
    // describe("Portfolio accessibility", () => {
    //     beforeEach(() => {
    //         cy.visit("/portfolio").get("main").injectAxe();
    //     });
    
    //     it("Has no accessibility violations after load", () => {
    //         cy.visit("/portfolio")
    //         cy.checkA11y();
    //     })
    // })

    // describe('Filter pages', () => {
    //     describe('blog page', () => {
    //         beforeEach(() => {
    //             cy.visit('/blog')
    //         })
    //         it('Has no accessibility violations when the page is visited', () => {
    //             cy.checkA11y();
    //         })

    //         it('Has no accessibility violations when date submenu is opened', () => {
    //             cy.checkA11y();
    //         })
    //     })

    //     describe('portfolio page', () => {
    //         beforeEach(() => {
    //             cy.visit('/portfolio')
    //         })

    //         it("Has no accessibility violations when the page is loaded", () => {
    //             cy.checkA11y();
    //         })
    //     })

    //     describe('author page', () => {
    //         beforeEach(() => {
    //             cy.visit('/author')
    //         })

    //         it("Has no accessibility violations when the page is loaded", () => {
    //             cy.checkA11y();
    //         })
    //     })
    // })

    // describe('template pages', () => {
    //     describe('project', () => {
    //         beforeEach(() => {
    //             cy.visit('/portfolio')
    //             cy.get("article").first().within().get("h3").click()
    //         })

    //         it("Has no accessibility violations when the page is loaded", () => {
    //             cy.checkA11y();
    //         })
    //     })

    //     describe('book', () => {
    //         beforeEach(() => {
    //             cy.visit('/author')
    //             cy.get("article").first().within().get("h3").click()
    //         })

    //         it("Has no accessibility violations when the page is loaded", () => {
    //             cy.checkA11y();
    //         })
    //     })

    //     describe('story', () => {
    //         beforeEach(() => {
    //             cy.visit('/author/short-stories')
    //             cy.get("article").first().within(article  => {
    //                 cy.get("h3").click()
    //             })
    //         })

    //         it("Has no accessibility violations when the page is loaded", () => {
    //             cy.checkA11y();
    //         })
    //     })

    //     describe('blog', () => {
    //         beforeEach(() => {
    //             cy.visit('/blog')
    //             cy.get("article").first().within().get("h3").click()
    //         })

    //         it("Has no accessibility violations when the page is loaded", () => {
    //             cy.checkA11y();
    //         })
    //     })
    // })
});
