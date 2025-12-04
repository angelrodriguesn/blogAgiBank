const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: "mocha-junit-reporter",
  reporterOptions: {
    mochaFile: "results/junit/results-[hash].xml",
    toConsole: true
  },

  e2e: {
    baseUrl: 'https://blog.agibank.com.br',
    viewportWidth: 1500,
    viewportHeight: 900,
    video: true,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 3,  
      openMode: 2  
    },
    setupNodeEvents(on, config) {
    },
  },
})

