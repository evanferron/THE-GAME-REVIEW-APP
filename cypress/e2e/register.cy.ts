describe('Register Page', () => {
    beforeEach(() => {
        cy.visit('/register');
    });

    it('should display the register form', () => {
        cy.contains('Create an account !').should('be.visible');
        cy.get('input[type="email"]').should('be.visible');
        cy.get('input[type="password"]').should('have.length', 2);
        cy.get('input[type="text"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
    });

    it('should show validation errors for empty fields', () => {
        cy.get('button[type="submit"]').click();

        cy.contains('Invalid email').should('be.visible');
        cy.contains('Password too short').should('be.visible');
        cy.contains('Nickname too short').should('be.visible');
    });
});