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

    it('should show validation error for invalid email', () => {
        // Patch : retire complètement l'attribut type et required pour désactiver la validation HTML5
        cy.get('[data-cy="login-password"]').clear().type('123456');
        // Soumet le formulaire directement
        cy.get('form').submit();
        cy.get('[data-cy="login-email-error"]').should('be.visible').and('contain', 'Invalid email');
    });

    it('should show validation error for short password', () => {
        cy.get('[data-cy="login-email"]').clear().type('test@email.com');
        cy.get('[data-cy="login-password"]').clear().type('123');
        cy.get('[data-cy="login-submit"]').click();
        cy.get('[data-cy="login-password-error"]').should('be.visible').and('contain', 'password too short');
    });

    it('should show API error for invalid credentials', () => {
        cy.get('[data-cy="login-email"]').clear().type('wrong@email.com');
        cy.get('[data-cy="login-password"]').clear().type('wrongpassword');
        cy.get('[data-cy="login-submit"]').click();
        cy.get('[data-cy="login-api-error"]').should('be.visible').and('contain', 'Invalid credentials');
    });
});
