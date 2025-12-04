const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://blog.agibank.com.br',
    viewportWidth: 1450,
    viewportHeight: 800,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 60000,
    setupNodeEvents(on, config) {
    },
  },
})

