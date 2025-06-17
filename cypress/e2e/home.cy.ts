describe('Home page', () => {
    it('Visits the initial project page', () => {
        cy.visit('/');
    });

    it('Displays the navbar and footer', () => {
        cy.visit('/');
        cy.get('nav').should('exist');
        cy.get('footer').should('exist');
    });

    it('Shows loading spinner while fetching games', () => {
        cy.intercept('GET', '/api/game/top', (req) => {
            // Simule un délai de réponse
            req.on('response', (res) => new Promise(resolve => setTimeout(resolve, 1000)));
        }).as('fetchGames');
        cy.visit('/');
        cy.get('[class*=loading]').should('exist');
        cy.wait('@fetchGames');
    });

    it('Displays carousels and lists when games are loaded', () => {
        cy.intercept('GET', '/api/game/top', { fixture: 'games.json', statusCode: 200, delay: 100 }).as('fetchGames');
        cy.visit('/');
        cy.wait('@fetchGames');
        cy.get('[data-testid="game-carousel"]').should('exist');
        cy.contains('Top rated').should('exist');
        cy.contains('Most played').should('exist');
        cy.contains('The most criticised').should('exist');
    });

    it('Opens and closes the game details popup', () => {
        cy.intercept('GET', '/api/game/top', { fixture: 'games.json', statusCode: 200 }).as('fetchGames');
        cy.intercept('GET', /\/api\/game\/[0-9]+/, { fixture: 'gameDetails.json', statusCode: 200 }).as('fetchGameDetails');
        cy.visit('/');
        cy.wait('@fetchGames');
        cy.get('[data-testid="game-card"]').first().click();
        cy.wait('@fetchGameDetails');
        cy.get('[data-testid="modal-overlay"]').should('exist');
        cy.get('[data-testid="modal-overlay"]').click('topLeft'); // Ferme en cliquant à l'extérieur
        cy.get('[data-testid="modal-overlay"]').should('not.exist');
    });

    it('Displays error message if API fails', () => {
        cy.intercept('GET', '/api/game/top', { statusCode: 500, body: { success: false } }).as('fetchGamesError');
        cy.visit('/');
        cy.wait('@fetchGamesError');
        cy.get('[data-testid="home-error"]').should('exist');
    });
});