describe('Dashboard E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the dashboard and display the feed', () => {
    cy.contains('Dashify').should('be.visible');
    cy.contains('Your Feed').should('be.visible');
  });

  it('should allow searching content', () => {
    cy.get('input[placeholder="Search news, recommendations..."]').type('Tech Giants');
    // The feed should eventually show the mocked item with Tech Giants
    cy.contains('Tech Giants Announce New AI Models').should('be.visible');
  });

  it('should toggle dark mode', () => {
    // Initial state might be dark mode based on slice default
    cy.get('html').should('have.class', 'dark');
    
    // Find the toggle button (Sun/Moon icon)
    // We can target the button in the header
    cy.get('header button').first().click();
    
    // Should remove dark mode
    cy.get('html').should('not.have.class', 'dark');
  });
});
