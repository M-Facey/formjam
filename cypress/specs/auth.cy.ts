describe("Login Tests", () => {
  it("should log in successfully", () => {
    cy.login();
  });

  it("should fail to login", () => {
    cy.intercept(
      "POST",
      Cypress.env("API_URL") + "/api/collections/users/auth-with-password"
    ).as("loginRequest");
    cy.visit("/auth/login");

    // Specify creds for the user that doesn't exists
    cy.login("test@test.com", "password", false);
    cy.wait("@loginRequest").its("response.statusCode").should("eq", 400);

    cy.get('[data-cy="server_error_message"]').contains(
      "Failed to authenticate"
    );
    cy.wait(5000);
    cy.get('[data-cy="server_error_message"]').should("not.exist");
  });

  it("should show email address validation error", () => {
    cy.visit("/auth/login");

    cy.get('[data-cy="login_email_input"]').type("test");
    cy.get('[data-cy="login_email_input_error"]')
      .should("exist")
      .contains("Your email must be valid");

    cy.get('[data-cy="login_email_input"]').clear();
    cy.get('[data-cy="login_email_input_error"]')
      .should("exist")
      .contains("Your email is required");
  });

  it("should show password validation error", () => {
    cy.visit("/auth/login");

    cy.get('[data-cy="login_password_input"]').type("test");
    cy.get('[data-cy="login_password_input_error"]')
      .should("exist")
      .contains("Your password must be at least 8 characters");

    cy.get('[data-cy="login_password_input"]').clear();
    cy.get('[data-cy="login_password_input_error"]')
      .should("exist")
      .contains("Your password is required");

    cy.get('[data-cy="login_password_input"]')
      .clear()
      .type("oVr32EB1b,KQe8oz#2JtD]5AOh@");
    cy.get('[data-cy="login_password_input_error"]')
      .should("exist")
      .contains("Your password must be at most 25 characters");
  });

  it("should redirect to sign up page", () => {
    cy.visit("/auth/login");
    cy.get('[data-cy="login_goto_signup_link"]').click();
    cy.location("pathname").should("eq", "/auth/signup");
  });

  it("should redirect to password reset page", () => {
    cy.visit("/auth/login");
    cy.get('[data-cy="login_goto_password_reset_link"]').click();
    cy.location("pathname").should("eq", "/auth/reset-your-password");
  });
});

describe("Signup Tests", () => {
  // it("should sign up successfully", () => {});
  // it("should fail to sign up", () => {});
  // validate each inputs
  // validate login redirect
});

describe("Logout Test", () => {
  it("should log out successfully", () => {
    cy.login();
    cy.logout();
  });
});
