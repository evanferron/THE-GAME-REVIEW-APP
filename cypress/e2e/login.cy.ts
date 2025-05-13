describe('Login Page', () => {
    beforeEach(() => {
        // Visite la page de connexion avant chaque test
        cy.visit('/login');
    });

    it('should display the login form', () => {
        // Vérifie que le formulaire de connexion est affiché
        cy.contains('Log in!').should('be.visible');
        cy.get('input[type="email"]').should('be.visible');
        cy.get('input[type="password"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
    });

    it('should show validation errors for empty fields', () => {
        // Soumet le formulaire sans remplir les champs
        cy.get('button[type="submit"]').click();

        // Vérifie que les messages d'erreur de validation sont affichés
        cy.contains('Invalid email').should('be.visible');
        cy.contains('password too short').should('be.visible');
    });
});
