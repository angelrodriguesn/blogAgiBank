class HomePage {
  visit() {
    cy.visit('/');
  }

  openSearch() {
    const searchIconSelector =
      'a.slide-search.astra-search-icon[aria-label="Search button"]';
    const searchFieldSelector = '#search-field';

    cy.document().its('readyState').should('eq', 'complete');
    cy.get(searchIconSelector)
      .should('be.visible')
      .click();
    cy.wait(500);
    cy.get('body').then(($body) => {
      const $field = $body.find(searchFieldSelector);
      const hasVisibleSearchField =
        $field.length && Cypress.$($field).is(':visible');

      if (!hasVisibleSearchField) {
        cy.contains('span.menu-text', 'Stories', { matchCase: false })
          .should('be.visible')
          .click();
        cy.get(searchIconSelector)
          .should('be.visible')
          .click();
      }
    });
    cy.get(searchFieldSelector, { timeout: 10000 }).should('be.visible');
  }

  searchFor(term) {
    this.visit();
    this.openSearch();

    cy.get('#search-field')
      .type(`${term}{enter}`);
  }
}

export default HomePage;