/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(
      email?: string,
      password?: string,
      userExist?: boolean
    ): Chainable<void>;
    logout(): Chainable<void>;
    task<T>(
      event: string,
      arg?: any,
      options?: Partial<Loggable & Timeoutable>
    ): Chainable<T>;
  }
}
