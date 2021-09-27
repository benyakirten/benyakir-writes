/// <reference types="Cypress" />

describe("Project template", () => {
    it("Has no accessibility violations", () => {
        cy.visit("/project/benyakir-writes").get("main").injectAxe();
        cy.checkA11y();
    })
})

describe("Book template", () => {
    it("Has no accessibility violations", () => {
        cy.visit("/book/delusions-of-form").get("main").injectAxe();
        cy.checkA11y();
    })
})

describe("Shortstory template", () => {
    it("Has no accessibility violations", () => {
        cy.visit("/story/the-human-error").get("main").injectAxe();
        cy.checkA11y();
    }) 
})

describe("Blog post template",  () => {
    it("Has no accessibility violations", () => {
        cy.visit("/post/a-weeks-worth-backend-with-graphql-and-django").get("main").injectAxe();
        cy.checkA11y();
    })
})