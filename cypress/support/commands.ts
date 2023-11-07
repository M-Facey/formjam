/// <reference types="../cypress.d.ts" />

Cypress.Commands.add(
  "validatePasswordInput",
  (dataAttrs: string, fieldName: string) => {
    cy.get(`[data-cy="${dataAttrs}"]`).type("123");
    cy.get(`[data-cy="${dataAttrs}_error"]`).contains(
      fieldName + " must be at least 8 characters"
    );
    cy.get(`[data-cy="${dataAttrs}"]`)
      .clear()
      .type("oVr32EB1b,KQe8oz#2JtD]5AOh@");
    cy.get(`[data-cy="${dataAttrs}_error"]`).contains(
      fieldName + " must be at most 25 characters"
    );
    cy.get(`[data-cy="${dataAttrs}"]`).clear();
    cy.get(`[data-cy="${dataAttrs}_error"]`).contains(
      fieldName + " is required"
    );
  }
);

Cypress.Commands.add(
  "validateConfirmPasswordInput",
  (dataAttrs: string, passwordDataAttrs: string, fieldName: string) => {
    cy.get(`[data-cy="${passwordDataAttrs}"]`).type("123").clear();
    cy.get(`[data-cy="${dataAttrs}"]`).type("123").clear();
    cy.get(`[data-cy="${dataAttrs}_error"]`).contains(
      fieldName + " is required"
    );
    cy.get(`[data-cy="${dataAttrs}"]`)
      .clear()
      .type("oVr32EB1b,KQe8oz#2JtD]5AOh@");
    cy.get(`[data-cy="${dataAttrs}_error"]`).contains(
      fieldName + " must match "
    );
  }
);

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
