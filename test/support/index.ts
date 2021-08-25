// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './custom-commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

/**
 * This is an example custom command. To make cypress's
 * typescript bindings aware of it, you can add it
 * to test/typings/index.d.ts
 */

 Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test. //To turn off all uncaught exceptions.
    return false
  })

  import '../../node_modules/cypress-xpath'

 

  