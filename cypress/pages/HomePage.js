class HomePage {
  visit() {
    cy.visit('/', { timeout: 15000 });
  }

  openSearch() {
    const searchIcon = 'a.slide-search.astra-search-icon[aria-label="Search button"]';
    const searchField = '#search-field';

    cy.get(searchIcon, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.wait(1000);

    cy.url().then((url) => {
      if (url.includes('/#')) {
        cy.go('back');
        cy.wait(500);
        cy.get(searchIcon, { timeout: 10000 })
          .should('be.visible')
          .click({ force: true });
        cy.wait(500);
      }
    });

    cy.get(searchField, { timeout: 15000 })
      .should('be.visible')
      .and('not.be.disabled');
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