/// <reference types="../cypress.d.ts" />

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
    cy.get('[data-cy="login_password_input_error"]').contains(
      "Your password must be at least 8 characters"
    );

    cy.get('[data-cy="login_password_input"]').clear();
    cy.get('[data-cy="login_password_input_error"]').contains(
      "Your password is required"
    );

    cy.get('[data-cy="login_password_input"]')
      .clear()
      .type("oVr32EB1b,KQe8oz#2JtD]5AOh@");
    cy.get('[data-cy="login_password_input_error"]').contains(
      "Your password must be at most 25 characters"
    );
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

  it("should redirect to homepage page", () => {
    cy.visit("/auth/login");
    cy.get('[data-cy="login_goto_home_link"]').click();
    cy.wait(500);
    cy.location("pathname").should("eq", "/");
  });
});

describe("Signup Tests", () => {
  interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  it("should sign up successfully", () => {
    cy.intercept(
      "POST",
      Cypress.env("API_URL") + "/api/collections/users/records"
    ).as("signupRequest");

    cy.task<User>("getFreshUser").then((user) => {
      cy.visit("/auth/signup");
      cy.get('[data-cy="signup_firstname_input"]').type(user.firstName);
      cy.get('[data-cy="signup_lastname_input"]').type(user.lastName);
      cy.get('[data-cy="signup_email_input"]').type(user.email);
      cy.get('[data-cy="signup_password_input"]').type(user.password);
      cy.get('[data-cy="signup_confirm_password_input"]').type(
        user.confirmPassword
      );

      cy.get('[data-cy="signup_submit_btn"]').click();
      cy.wait("@signupRequest").its("response.statusCode").should("eq", 200);
      cy.wait(500);
      cy.location("pathname").should("eq", "/auth/login");
    });
  });

  it("should fail to sign up", () => {
    cy.intercept(
      "POST",
      Cypress.env("API_URL") + "/api/collections/users/records"
    ).as("signupRequest");

    cy.visit("/auth/signup");
    cy.task<User>("getFreshUser").then((user) => {
      cy.visit("/auth/signup");
      cy.get('[data-cy="signup_firstname_input"]').type(user.firstName);
      cy.get('[data-cy="signup_lastname_input"]').type(user.lastName);
      cy.get('[data-cy="signup_email_input"]').type(Cypress.env("USER_EMAIL"));
      cy.get('[data-cy="signup_password_input"]').type(
        Cypress.env("USER_PASSWORD")
      );
      cy.get('[data-cy="signup_confirm_password_input"]').type(
        Cypress.env("USER_PASSWORD")
      );

      cy.get('[data-cy="signup_submit_btn"]').click();
      cy.wait("@signupRequest").its("response.statusCode").should("eq", 400);
      cy.get('[data-cy="server_error_message"]').contains(
        "The email is invalid or already in use."
      );
      cy.wait(5000);
      cy.get('[data-cy="server_error_message"]').should("not.exist");
    });
  });

  it("should show first name validation error", () => {
    cy.visit("/auth/signup");
    cy.get('[data-cy="signup_firstname_input"]').type("123");
    cy.get('[data-cy="signup_firstname_input_error"]').contains(
      "Please enter valid name"
    );
    cy.get('[data-cy="signup_firstname_input"]').clear().type("ma");
    cy.get('[data-cy="signup_firstname_input_error"]').contains(
      "Your first name must contain at least 3 characters"
    );
    cy.get('[data-cy="signup_firstname_input"]').clear();
    cy.get('[data-cy="signup_firstname_input_error"]').contains(
      "Your first name is required"
    );
  });

  it("should show last name validation error", () => {
    cy.visit("/auth/signup");
    cy.get('[data-cy="signup_lastname_input"]').type("123");
    cy.get('[data-cy="signup_lastname_input_error"]').contains(
      "Please enter valid name"
    );
    cy.get('[data-cy="signup_lastname_input"]').clear().type("ma");
    cy.get('[data-cy="signup_lastname_input_error"]').contains(
      "Your last name must contain at least 3 characters"
    );
    cy.get('[data-cy="signup_lastname_input"]').clear();
    cy.get('[data-cy="signup_lastname_input_error"]').contains(
      "Your last name is required"
    );
  });

  it("should show email address validation error", () => {
    cy.visit("/auth/signup");
    cy.get('[data-cy="signup_email_input"]').type("123");
    cy.get('[data-cy="signup_email_input_error"]').contains(
      "Your email must be valid"
    );
    cy.get('[data-cy="signup_email_input"]').clear();
    cy.get('[data-cy="signup_email_input_error"]').contains(
      "Your email is required"
    );
  });

  it("should show password validation error", () => {
    cy.visit("/auth/signup");
    cy.get('[data-cy="signup_password_input"]').type("123");
    cy.get('[data-cy="signup_password_input_error"]').contains(
      "Your password must contain at least 8 characters"
    );
    cy.get('[data-cy="signup_password_input"]')
      .clear()
      .type("oVr32EB1b,KQe8oz#2JtD]5AOh@");
    cy.get('[data-cy="signup_password_input_error"]').contains(
      "Your password must contain at most 25 characters"
    );
    cy.get('[data-cy="signup_password_input"]').clear();
    cy.get('[data-cy="signup_password_input_error"]').contains(
      "Your password is required"
    );
  });

  it("should show confirm password validation error", () => {
    cy.visit("/auth/signup");
    cy.get('[data-cy="signup_password_input"]').type("123").clear();
    cy.get('[data-cy="signup_confirm_password_input"]').type("123").clear();
    cy.get('[data-cy="signup_confirm_password_input_error"]').contains(
      "Confirm Password is required"
    );
    cy.get('[data-cy="signup_confirm_password_input"]').type(
      "oVr32EB1b,KQe8oz#2JtD]5AOh@"
    );
    cy.get('[data-cy="signup_confirm_password_input_error"]').contains(
      "Confirm Password must match your password"
    );
  });

  it("should redirect to login page", () => {
    cy.visit("/auth/signup");
    cy.get('[data-cy="signup_goto_login_link"]').click();
    cy.wait(500);
    cy.location("pathname").should("eq", "/auth/login");
  });

  it("should redirect to homepage page", () => {
    cy.visit("/auth/signup");
    cy.get('[data-cy="signup_goto_home_link"]').click();
    cy.wait(500);
    cy.location("pathname").should("eq", "/");
  });
});

describe("Logout Test", () => {
  it("should log out successfully", () => {
    cy.login();
    cy.logout();
  });
});
