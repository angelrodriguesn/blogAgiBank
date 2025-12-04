class HomePage {
  visit() {
    cy.visit('/', { timeout: 15000 });
    // Aguarda a página carregar completamente
    cy.document().its('readyState').should('eq', 'complete');
  }

 openSearch() {
    cy.get('a.slide-search.astra-search-icon')
      .should('be.visible')
      .click();

    cy.url().then((url) => {
      const hasReloaded = url.includes('#') || url === 'https://blog.agibank.com.br/#';

      if (hasReloaded) {
        cy.wait(800);
        cy.get('a.slide-search.astra-search-icon')
          .should('be.visible')
          .click();
      }
    });
    cy.get('#search-field', { timeout: 10000 })
      .should('be.visible')
      .should('be.enabled');
  }


  searchFor(term) {
    const searchFieldSelector = '#search-field';

    this.visit();
    this.openSearch();

    cy.get(searchFieldSelector, { timeout: 10000 })
      .should('be.visible')
      .type(`${term}{enter}`, { delay: 100 });
  }
}

export default HomePage;