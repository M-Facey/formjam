/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    validatePasswordInput(
      dataAttrs: string,
      fieldName: string
    ): Chainable<void>;
    validateConfirmPasswordInput(
      dataAttrs: string,
      passwordDataAttrs: string,
      fieldName: string
    ): Chainable<void>;
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
