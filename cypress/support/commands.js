/** @format */

import "@testing-library/cypress/add-commands"
import "cypress-real-events/support"
import { cypressBrowserPermissionsPlugin } from 'cypress-browser-permissions'

module.exports = (on, config) => {
  // The plugin may modify the Cypress config, so be sure
  // to return it
  config = cypressBrowserPermissionsPlugin(on, config)

  //
  // Any existing plugins you are using
  //

  return config
}

Cypress.Commands.add('getBySel', (selector, ...args) => cy.get(`[data-testid=${selector}]`, { timeout: 10000 }, ...args))
