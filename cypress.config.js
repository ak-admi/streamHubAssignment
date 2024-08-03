const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    hromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
