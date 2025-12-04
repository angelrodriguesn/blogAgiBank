class HomePage {
  visit() {
    cy.visit('/');
  }

  openSearch() {
    cy.get('a.slide-search.astra-search-icon[aria-label="Search button"]')
      .should('be.visible')
      .click();

    cy.url().then((url) => {
      const hasReloaded = url.includes('#') || url === 'https://blog.agibank.com.br/#';

      if (hasReloaded) {
        cy.wait(700);
        cy.get('a.slide-search.astra-search-icon[aria-label="Search button"]')
          .should('be.visible')
          .click();
      }
    });
    cy.get('#search-field', { timeout: 10000 })
      .should('be.visible')
      .should('be.enabled');
  }

  searchFor(term) {
    this.visit();
    this.openSearch();

    cy.get('#search-field')
      .type(`${term}{enter}`);
  }
}

export default HomePage;