# AgiBank - Cypress E2E Tests

Projeto de testes end-to-end (E2E) com Cypress para validação da funcionalidade de busca do Blog do Agi Bank.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Executar](#como-executar)
- [Testes Disponíveis](#testes-disponíveis)
- [Troubleshooting](#troubleshooting)
- [CI/CD Pipeline](#cicd-pipeline)

---

## 🎯 Visão Geral

Este projeto implementa testes E2E para validar:

✅ **Busca de Artigos**
- Busca por título exato
- Busca por palavra-chave
- Validação de resultados inválidos

✅ **Navegação de Artigos**
- Acesso a informações detalhadas
- Validação de conteúdo

✅ **Newsletter**
- Validação de widget
- Inscrição com email
- Validações de formulário

---

## 📦 Requisitos

- **Node.js**: v20+
- **npm**: v10+
- **Cypress**: v15.7.1
- **navegador Chrome**: Instalado e atualizado

---

## 🚀 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/angelrodriguesn/blogAgiBank.git
cd agiBank - Cypress
```

### 2. Instalar dependências

```bash
npm ci
```

### 3. Instalar Cypress (se necessário)

```bash
npx cypress install
```

---

## ⚙️ Configuração

### Arquivo: `cypress.config.js`

```javascript
{
  baseUrl: 'https://blog.agibank.com.br',
  viewportWidth: 1500,
  viewportHeight: 900,
  defaultCommandTimeout: 10000,
  requestTimeout: 20000,
  responseTimeout: 20000,
  retries: {
    runMode: 3,      
    openMode: 2      
}
```

### Variáveis Críticas

| Variável | Valor | Propósito |
|----------|-------|----------|
| `baseUrl` | `https://blog.agibank.com.br` | URL do blog a testar |
| `viewportWidth` | `1500px` | Largura do viewport |
| `viewportHeight` | `900px` | Altura do viewport |
| `requestTimeout` | `20000ms` | Timeout para requisições |
| `retries.runMode` | `3` | Retries automáticos em CI/CD |

---

## 📁 Estrutura do Projeto

```
agiBank - Cypress/
├── cypress/
│   ├── e2e/
│   │   └── search/
│   │       └── search.cy.js          # Casos de teste principais
│   ├── pages/
│   │   ├── HomePage.js               # Page Object: Homepage
│   │   └── SearchResultsPage.js      # Page Object: Resultados
│   ├── support/
│   │   ├── commands.js               # Comandos customizados
│   │   └── e2e.js                    # Configuração E2E
│   ├── screenshots/                  # Screenshots de falhas
│   └── videos/                       # Vídeos dos testes
├── .github/
│   └── workflows/
│       └── cypress.yml               # Pipeline GitHub Actions
├── cypress.config.js                 # Configuração Cypress
├── package.json                      # Dependências
└── README.md                         # Este arquivo
```

---

## 🎬 Como Executar

### Executar todos os testes (headless)

```bash
npm run test
```

### Abrir Cypress Studio (interativo)

```bash
npm run open
```

### Executar teste específico

```bash
npx cypress run --spec cypress/e2e/search/search.cy.js
```

### Executar com browser específico

```bash
npm run test -- --browser chrome
npm run test -- --browser firefox
```

---

## Testes Disponíveis

### 1. **Deve exibir resultado correto ao buscar artigo por título**
- Busca por título exato: "Biometria Facial: o que é, como funciona e como cadastrar corretamente"
- Valida título nos resultados
- Valida artigos retornados

### 2. **Deve exibir resultados corretos ao buscar artigos por palavra-chave**
- Busca por palavra-chave: "benefícios"
- Valida múltiplos resultados
- Verifica conteúdo dos artigos

### 3. **Deve exibir "nenhum resultado" ao pesquisar com caractere inválido**
- Busca com: "@@@@####"
- Valida mensagem de erro

### 4. **Deve exibir "nenhum resultado" ao pesquisar com palavra não existente**
- Busca por termo inexistente
- Valida mensagem padrão

### 5. **Acessar informações de um artigo válido**
- Clica em artigo nos resultados
- Valida carregamento da página completa
- Verifica conteúdo principal

### 6. **Buscar por termo na tela de nenhum resultado**
- Busca refinada a partir de tela vazia
- Valida novo resultado

### 7. **Deve validar conteúdo da newsletter**
- Verifica presença do widget
- Valida título e descrição

### 8. **Deve assinar newsletter**
- Preenche email dinâmico
- Valida mensagem de sucesso

### 9. **Deve exibir erro ao assinar sem email**
- Tenta submeter vazio
- Valida mensagem de validação

### 10. **Deve exibir erro com email inválido**
- Tenta submeter com "@teste"
- Valida mensagem de formato inválido

---

## 🏗️ Page Objects

### HomePage

```javascript
class HomePage {
  visit()                    // Visita homepage e aguarda carregamento
  openSearch()              // Clica na lupa e abre modal de busca
  searchFor(term)           // Realiza busca por termo
}
```

**Lógica especial**: Detecta redirecionamento para `/#` e clica novamente na lupa

### SearchResultsPage

```javascript
class SearchResultsPage {
  validateResultsTitle(title)              // Valida título dos resultados
  validateArticles(expectedTitle)          // Valida lista de artigos
  validateNoResults(term)                  // Valida mensagem de erro
  validateArticleHeaderContent()           // Valida cabeçalho do artigo
  validateArticleContent()                 // Valida conteúdo do artigo
  validateNewsletterWidget(title, text)    // Valida widget newsletter
  validateNewsletterRequiredEmailError()   // Valida erro de email vazio
  validateNewsletterInvalidEmailError()    // Valida erro de email inválido
  signUpForNewsletter(email, message)      // Inscreve na newsletter
}
```

--
---

## 📊 CI/CD Pipeline

### GitHub Actions

**Arquivo**: `.github/workflows/cypress.yml`

**Triggers**:
- Push para `main` ou `review`
- Pull requests
- Execução manual

**Steps**:
1. Checkout do repositório
2. Setup Node.js v20
3. Instalação de dependências
4. Instalação de dependências Cypress
5. Execução dos testes (headless)
6. Upload de resultados JUnit
7. Upload de screenshots (em caso de falha)
8. Upload de vídeos

**Artifacts**:
- `tests-results/`: Relatórios JUnit
- `cypress-screenshots/`: Screenshots de falhas
- `cypress-videos/`: Vídeos dos testes


### Testes passam localmente mas falham na pipeline

**Causas comuns**:
- Timeouts insuficientes (aumentar 2-3x)
- Diferença de locale/idioma (usar regex)
- Elementos com `visibility: hidden` (usar `{force: true}`)

**Soluções**:
- Executar com `--headless`
- Aumentar retries em `cypress.config.js`
- Usar `cy.wait()` para sincronizar requisições


## 📈 Métricas e Relatórios

### Relatórios JUnit

Os testes geram relatórios JUnit em `results/junit/`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite name="Pesquisa de artigos" tests="10" failures="0">
    <testcase name="Deve exibir resultado correto..." time="11.146"/>
  </testsuite>
</testsuites>
```

### Vídeos e Screenshots

- **Vídeos**: `cypress/videos/search.cy.js.mp4`
- **Screenshots**: `cypress/screenshots/search.cy.js/`

---

## 👨‍💻 Autor

**Angelina Rodrigues**

---

## 📝 Changelog

### v1.0.0 (Atual)
- ✅ 10 casos de teste implementados
- ✅ Page Objects para HomePage e SearchResultsPage
- ✅ Suporte a CI/CD com GitHub Actions
- ✅ Tratamento de elementos ocultos
- ✅ Validações agnósticas de idioma
- ✅ Timeout e retry otimizados para pipeline