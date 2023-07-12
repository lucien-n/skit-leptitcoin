
describe('Create accounts', () => {
    it('should visit signup', () => {
        cy.visit("/auth/signup")
    })

    it('should signup', () => {
        const NUMBER_OF_USERS = 5;

        for (let num = 0; num < NUMBER_OF_USERS; num++) {
            cy.visit("/auth/signup")

            // cy.get('#username', { timeout: 3_000 }).should('be.visible');
            cy.get('#username').type('test' + num, { force: true })
            cy.get('#email').type('test' + num + "@mail.com", { force: true })
            cy.get('#password').type('test' + num + "$", { force: true })

            cy.get('#submit').click({ force: true })
        }
    })
})