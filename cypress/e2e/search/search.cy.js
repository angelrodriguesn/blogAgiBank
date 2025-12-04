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
    searchResultsPage.validateResultsTitle(searchArticleTitle)
    searchResultsPage.validateArticles(searchArticleTitle)
  });

  it('Deve exibir resultados corretos ao buscar artigos por palavra-chave', () => {
    homePage.searchFor(searchTerm)
    searchResultsPage.validateResultsTitle(searchTerm)
    searchResultsPage.validateArticles()
  });

  it('Deve exibir mensagem de "nenhum resultado" ao pesquisar com caractere inválido', () => {
    homePage.searchFor(invalidSearchTerm)
    searchResultsPage.validateResultsTitle(invalidSearchTerm)
    searchResultsPage.validateNoResults('Lamentamos, mas nada foi encontrado para sua pesquisa, tente novamente com outras palavras.')
  });

  it('Deve exibir mensagem de "nenhum resultado" ao pesquisar com palavra-chave/título não existente', () => {
    homePage.searchFor(validateNoResults)
    searchResultsPage.validateResultsTitle(validateNoResults)
    searchResultsPage.validateNoResults('Lamentamos, mas nada foi encontrado para sua pesquisa, tente novamente com outras palavras.')
  });

  it('Acessar informações de um artigo válido', () => {
    homePage.searchFor(searchArticleTitle)
    searchResultsPage.validateResultsTitle(searchArticleTitle)

    cy.intercept('GET', '**?relatedposts*')
      .as('relatedPosts');

    cy.contains('h2.entry-title a', searchArticleTitle)
      .click();

    cy.wait('@relatedPosts', { timeout: 60000 })
      .its('response.statusCode')
      .should('eq', 200);

    searchResultsPage.validateArticleHeaderContent();
    searchResultsPage.validateArticleContent();
  });

  it('Buscar por termo na tela de nenhum resultado', () => {
    homePage.searchFor(validateNoResults)
    searchResultsPage.getArticle(searchTerm)
    searchResultsPage.validateResultsTitle(searchTerm)
    searchResultsPage.validateArticles()
  });

  it('Deve validar conteúdo da newsletter', () => {
    homePage.searchFor(searchTerm)
    searchResultsPage.validateNewsletterWidget(
      'Se inscreva em nossa Newsletter',
      'Digite seu endereço de e-mail para receber todas as novidades do Blog do Agi por E-mail!'
    );
  });

  it('Deve assinar newsletter', () => {
    homePage.searchFor(searchTerm)
    const email = `joao${Date.now()}@hotmail.com`;
    const expectedMessage = `Sucesso! Enviamos um e-mail para confirmar a sua assinatura. Encontre o e-mail agora e clique em 'Confirmar' para iniciar a inscrição.`;

    searchResultsPage.signUpForNewsletter(email, expectedMessage)
  });

  it('Deve exibir mensagem de preenchimento obrigatório ao assinar sem e-mail', () => {
    homePage.searchFor(searchTerm);
    searchResultsPage.validateNewsletterRequiredEmailError();
  });

  it('Deve exibir mensagem de preenchimento de e-mail válido', () => {
    homePage.searchFor(searchTerm);
    searchResultsPage.validateNewsletterInvalidEmailError('@teste');

  })
})