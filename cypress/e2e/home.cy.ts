describe('Home page', () => {
    it('Visits the initial project page', () => {
        cy.visit('/');
        // todo : uncomment this line when the navbar is ready
        // cy.get('h1').should('have.text', 'The Game Review');
    });
});