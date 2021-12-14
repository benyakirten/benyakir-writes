/// <reference types="Cypress" />

describe("Blog posts accessibility", () => {
    beforeEach(() => {
        cy.visit("/blog").get("main").injectAxe();
    })

    it("Has no accessibility violations upon page load", () => {
        cy.checkA11y();

        cy.get('[data-cy=open-sidemenu]').click()
        cy.wait(1000)
        
        cy.get('[data-cy=sidebar-theme-toggle]').click()
        cy.wait(1000)
        cy.checkA11y()
    })

    it('Has no accessibility violations when text filter is changed', () => {
        cy.get("[data-cy=text-input]").type("syntax")
        cy.wait(300)
        cy.checkA11y();

        cy.get('[data-cy=open-sidemenu]').click()
        cy.wait(1000)
        
        cy.get('[data-cy=sidebar-theme-toggle]').click()
        cy.wait(1000)
        cy.checkA11y()
    })

    it("Has no accessibility violations after browsing through the pagination", () => {
        cy.get('[data-cy=page-flip-right]').eq(0).click()
        cy.checkA11y();

        cy.get('[data-cy=page-flip-left]').eq(0).click()
        cy.checkA11y();

        cy.get('[data-cy=open-sidemenu]').click()
        cy.wait(1000)
        
        cy.get('[data-cy=sidebar-theme-toggle]').click()
        cy.wait(1000)
        cy.checkA11y()

    })

    it("Has no accessibility violations after the dates are changed", () => {
        cy.get("[data-cy=foldout-dates]").click()
        cy.wait(1000)
        cy.checkA11y();

        cy.get('[data-cy=open-sidemenu]').click()
        cy.wait(1000)
        
        cy.get('[data-cy=sidebar-theme-toggle]').click()
        cy.wait(1000)
        cy.checkA11y()


        cy.get("input[type=date]").eq(0).type("2021-04-01")
        cy.checkA11y()

        cy.get("input[type=date]").eq(1).type("2020-11-01")
        cy.checkA11y()
        
        cy.get('[data-cy=sidebar-theme-toggle]').click()
        cy.wait(1000)
        cy.checkA11y()

    })

    it("Has no accessibility violations after the category filters are changed", () => {
        cy.get("[data-cy=foldout-categories]").click()
        cy.wait(1000)
        cy.checkA11y();

        cy.get('[data-cy=open-sidemenu]').click()
        cy.wait(1000)
        
        cy.get('[data-cy=sidebar-theme-toggle]').click()
        cy.wait(1000)
        cy.checkA11y()

        cy.get("[data-cy=multiple-choice]").then(() => {
            cy.get("[data-cy=select-reviews]").click()
            cy.checkA11y();

            cy.get('[data-cy=sidebar-theme-toggle]').click()
            cy.wait(1000)
            cy.checkA11y()
        })
    })

    it("Has no accessibility violations after the tag filters are changed", () => {
        cy.get("[data-cy=foldout-tags]").click()
        cy.wait(1000)
        cy.checkA11y();

        cy.get('[data-cy=open-sidemenu]').click()
        cy.wait(1000)
        
        cy.get('[data-cy=sidebar-theme-toggle]').click()
        cy.wait(1000)
        cy.checkA11y()

        cy.get("[data-cy=multiple-choice]").then(() => {
            cy.get("[data-cy=select-ide]").click()
            cy.checkA11y();
            
            cy.get('[data-cy=sidebar-theme-toggle]').click()
            cy.wait(1000)
            cy.checkA11y()
        })
    })
})