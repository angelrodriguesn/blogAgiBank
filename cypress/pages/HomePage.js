class HomePage {
  visit() {
    cy.visit('/');
  }

  openSearch() {
    const searchIconSelector =
      'a.slide-search.astra-search-icon[aria-label="Search button"]';
    const searchFieldSelector = '#search-field';
    const storiesMenuSelector = 'span.menu-text';

    cy.document().its('readyState')
      .should('eq', 'complete');
    cy.get(searchIconSelector)
      .should('be.visible')
      .click();

    cy.get('body').then(($body) => {

      cy.wait(300);

      const $field = $body.find(searchFieldSelector);
      const fieldExists = $field.length > 0;
      const fieldVisible = fieldExists && Cypress.$($field).is(':visible');

      if (!fieldVisible) {
        cy.contains(storiesMenuSelector, 'Stories', { matchCase: false })
          .should('be.visible')
          .click();
        cy.location('pathname', { timeout: 5000 })
          .should('satisfy', (pathname) =>
            pathname.includes('stories') || pathname === '/web-stories/'
          );
        cy.document().its('readyState')
          .should('eq', 'complete');
        cy.get(searchIconSelector)
          .should('be.visible')
          .click();
      }
    });

    cy.get(searchFieldSelector, { timeout: 10000 })
      .filter(':visible')
      .first()
      .should('not.be.disabled');
  }

  searchFor(term) {
    const searchFieldSelector = '#search-field';

    this.visit();
    this.openSearch();

    cy.get(searchFieldSelector, { timeout: 10000 })
      .filter(':visible')
      .first()
      .type(`${term}{enter}`);
  }
}

export default HomePage;