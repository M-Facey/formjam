/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(
      email?: string,
      password?: string,
      userExist?: boolean
    ): Chainable<void>;
    logout(): Chainable<void>;
  }
}
