/// <reference types="../cypress.d.ts" />

describe("UI Tests", () => {
  it("should able to toggle theme button", () => {
    cy.visit("/");

    cy.get('[data-cy="theme_toggle"]').get("input").should("not.be.checked");
    cy.get("html").should("not.have.class", "dark");

    cy.get('[data-cy="theme_toggle"]').click();

    cy.get('[data-cy="theme_toggle"]').get("input").should("be.checked");
    cy.get("html").should("have.class", "dark");
  });

  it("should be specific content on home page", () => {
    cy.visit("/");

    cy.get('[data-cy="home_login_btn"]').should("exist");
    cy.get('[data-cy="home_signup_btn"]').should("exist");
    cy.get('[data-cy="theme_toggle"]').should("exist");

    cy.get("h2").first().contains("Welcome to FormJAM");
    cy.get("h2").last().contains("Revolutionize Your Data Collection");
  });
});
