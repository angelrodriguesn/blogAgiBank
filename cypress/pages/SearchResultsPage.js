class SearchResultsPage {

  validateResultsTitle(tittleResults) {
    cy.get('h1.page-title.ast-archive-title')
      .should('be.visible')
      .and('contain.text', 'Resultados encontrados para:')
      .find('span')
      .should('have.text', tittleResults);
  }

  validateArticles(expectedTitle) {
    cy.get('article.post')
      .should('have.length.greaterThan', 0)
      .each(($article) => {
        cy.wrap($article).within(() => {
          cy.get('.entry-title a')
            .invoke('text')
            .then((text) => text.trim())
            .should((title) => expectedTitle ? expect(title).to.eq(expectedTitle) : expect(title).to.match(/\S+/));

          cy.get('img.attachment-large')
            .should('exist')
            .and(($img) => expect($img[0].naturalWidth).to.be.greaterThan(0));

          cy.get('.entry-meta .published')
            .invoke('text')
            .then((text) => text.trim())
            .should('match', /^\d{2}\/\d{2}\/\d{4}$/);
        });
      });
  }

  validateNoResults(invalidSearchTerm) {
    cy.get('section.no-results.not-found').within(() => {
      cy.get('p').should('contain.text', invalidSearchTerm);
    });
  }

  validateArticleHeaderContent() {
    cy.get('header.entry-header h1.entry-title')
      .should('be.visible')
      .and(($h1) => expect($h1.text().trim()).to.match(/\S+/));

    cy.get('header.entry-header .entry-meta .posted-by')
      .should('be.visible')
      .and(($author) => expect($author.text().trim()).to.match(/\S+/));

    cy.get('header.entry-header .entry-meta .posted-on .updated')
      .should('be.visible')
      .and(($date) => expect($date.text().trim()).to.match(/\d{2}\/\d{2}\/\d{4}/));

    cy.get('header.entry-header .post-thumb-img-content img')
      .should('be.visible')
      .and(($img) => expect($img[0].naturalWidth).to.be.greaterThan(0));

    cy.get('header.entry-header .ast-post-social-sharing a')
      .should('have.length.greaterThan', 0)
      .each(($link) => {
        cy.wrap($link).should('be.visible')
          .and(($a) => expect($a.attr('href')).to.match(/\S+/));
      });
  }

  validateArticleContent() {
    cy.get('div.entry-content.clear')
      .find('p, h1, h2, h3, h4, h5, h6')
      .filter((_, el) => el.offsetHeight > 0 && el.offsetWidth > 0) // só elementos "visíveis"
      .filter((_, el) => el.innerText.trim().length > 0)          // só com texto
      .should('have.length.greaterThan', 0)
      .each(($el) => {
        cy.wrap($el)
          .should('be.visible')
          .and(($el) => expect($el.text().trim()).to.match(/\S+/));
      });
  }

  getArticle(titulo) {
    cy.get('input[placeholder="Search..."]')
      .eq(1)
      .type(titulo);

    cy.get('button.search-submit.ast-search-submit')
    .eq(1).click({force:true})
    
  }
}

export default SearchResultsPage;