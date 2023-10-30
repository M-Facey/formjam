/// <reference types="../cypress.d.ts" />

Cypress.Commands.add("login", () => {
  cy.visit("/");

  cy.get('[data-cy="home_login_btn"]').click();
  cy.location("pathname").should("equal", "/auth/login");

  // The email input could have a value because of the remember me option
  cy.get('[data-cy="login_email_input"]')
    .clear()
    .type(Cypress.env("USER_EMAIL"));
  cy.get('[data-cy="login_password_input"]').type(Cypress.env("USER_PASSWORD"));

  cy.get('[data-cy="login_submit_btn"]').click();

  cy.wait(500);
  cy.location("pathname").should("equal", "/dashboard");
});

Cypress.Commands.add("logout", () => {
  cy.visit("/");
  cy.location("pathname").should("equal", "/dashboard");

  cy.get('[data-cy="dashboard_logout_btn"]').click();
  cy.location("pathname").should("equal", "/auth/login");
});
