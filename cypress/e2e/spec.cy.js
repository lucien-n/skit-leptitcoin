describe('spec.cy.js', () => {
    it('should visit', () => {
        cy.visit('/')
    })

    it('should sign-in', () => {
        cy.visit('/auth/signin')

        cy.get('#email').type('admin@mail.com')
        cy.get('#password').type('admin1234')

        cy.get('submit').click()
    })
})