/// <reference types="../cypress.d.ts" />

Cypress.Commands.add(
  "login",
  (email?: string, password?: string, userExists = true) => {
    const userEmailAddress = email ? email : Cypress.env("USER_EMAIL");
    const userPassword = password ? password : Cypress.env("USER_PASSWORD");

    cy.visit("/");

    cy.get('[data-cy="home_login_btn"]').click();
    cy.location("pathname").should("equal", "/auth/login");

    // The email input could have a value because of the remember me option
    cy.get('[data-cy="login_email_input"]').clear().type(userEmailAddress);
    cy.get('[data-cy="login_password_input"]').type(userPassword);

    cy.get('[data-cy="login_submit_btn"]').click();

    if (userExists) {
      cy.wait(500);
      cy.location("pathname").should("equal", "/dashboard");
    }
  }
);

Cypress.Commands.add("logout", () => {
  cy.visit("/");
  cy.location("pathname").should("equal", "/dashboard");

  cy.get('[data-cy="dashboard_logout_btn"]').click();
  cy.location("pathname").should("equal", "/auth/login");
});
