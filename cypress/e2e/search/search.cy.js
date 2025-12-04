import HomePage from '../../pages/HomePage'
import SearchResultsPage from '../../pages/SearchResultsPage'

describe('Pesquisa de artigos no Blog do Agi', () => {
  const homePage = new HomePage()
  const searchResultsPage = new SearchResultsPage()
  const searchTerm = 'benefícios';
  const searchArticleTitle = 'Biometria Facial: o que é, como funciona e como cadastrar corretamente';
  const invalidSearchTerm = '@@@@####';
  const validateNoResults = 'noResults'

  it('Deve exibir resultado correto ao buscar artigo por título', () => {
    homePage.searchFor(searchArticleTitle)
    cy.url().should('satisfy', url => url.includes('s='))
    searchResultsPage.validateResultsTitle(searchArticleTitle)
    searchResultsPage.validateArticles(searchArticleTitle)
  });

  it('Deve exibir resultados corretos ao buscar artigos por palavra-chave', () => {
    homePage.searchFor(searchTerm)
    cy.url().should('satisfy', url => url.includes('s='))
    searchResultsPage.validateResultsTitle(searchTerm)
    searchResultsPage.validateArticles()
  });

  it('Deve exibir mensagem de "nenhum resultado" ao pesquisar com caractere inválido', () => {
    homePage.searchFor(invalidSearchTerm)
    cy.url().should('satisfy', url => url.includes('s='))
    searchResultsPage.validateResultsTitle(invalidSearchTerm)
    searchResultsPage.validateNoResults('Lamentamos, mas nada foi encontrado para sua pesquisa, tente novamente com outras palavras.')
  });

  it('Deve exibir mensagem de "nenhum resultado" ao pesquisar com palavra-chave/título não existente', () => {
    homePage.searchFor(validateNoResults)
    cy.url().should('satisfy', url => url.includes('s='))
    searchResultsPage.validateResultsTitle(validateNoResults)
    searchResultsPage.validateNoResults('Lamentamos, mas nada foi encontrado para sua pesquisa, tente novamente com outras palavras.')
  });

  it('Acessar informações de um artigo válido', () => {
    homePage.searchFor(searchArticleTitle)
    cy.url().should('satisfy', url => url.includes('s='))
    searchResultsPage.validateResultsTitle(searchArticleTitle)

    cy.intercept('GET', '**?relatedposts*')
      .as('relatedPosts');

    cy.contains('h2.entry-title a', searchArticleTitle)
      .click();

    cy.wait('@relatedPosts')
      .its('response.statusCode')
      .should('eq', 200);

    searchResultsPage.validateArticleHeaderContent();
    searchResultsPage.validateArticleContent();
  });

  it('Buscar por termo na tela de nenhum resultado', () => {
    homePage.searchFor(validateNoResults)
    cy.url().should('satisfy', url => url.includes('s='))
    searchResultsPage.getArticle(searchTerm)
    searchResultsPage.validateResultsTitle(searchTerm)
    searchResultsPage.validateArticles()
  });

})