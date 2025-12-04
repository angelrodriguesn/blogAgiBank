class HomePage {
  visit() {
    cy.visit('/');
  }

  openSearch() {
    const searchIcon = 'a.slide-search.astra-search-icon[aria-label="Search button"]';
    const searchField = '#search-field';
    const storiesMenu = 'span.menu-text';

    cy.get(searchIcon).should('be.visible').click();
    cy.get('body').then(($body) => {
      const searchVisible = $body.find(searchField).is(':visible');

      if (searchVisible) return; 

      cy.location('pathname', { timeout: 10000 }).then((pathname) => {
        if (pathname === '/' || pathname === '/#') {
          cy.contains(storiesMenu, 'Stories', { matchCase: false })
            .should('be.visible')
            .click();

          cy.document().its('readyState').should('eq', 'complete');

          cy.get(searchIcon).should('be.visible').click();
        }
      });
    });

    cy.get(searchField, { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled');
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