/// <reference types="../cypress.d.ts" />

describe("Dashboard tests", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should have no forms", () => {
    cy.intercept(
      "GET",
      Cypress.env("API_URL") + "/api/collections/forms/records",
      {
        page: 1,
        perPage: 500,
        totalItems: -1,
        totalPages: -1,
        items: [],
      },
    ).as("fetch-forms");
    cy.get('[data-cy="create_form_card"]').should("exist");
    cy.get('[data-cy="form_card"]').should("not.exist");
  });

  it("should able to create a new form", () => {
    cy.intercept(
      "POST",
      Cypress.env("API_URL") + "/api/collections/forms/records",
    ).as("create-form");
    cy.get('[data-cy="create_form_card"]').click();
    cy.wait("@create-form");
  });

  it("should able to delete a form", () => {
    cy.intercept(
      "DELETE",
      Cypress.env("API_URL") + "/api/collections/forms/records/*",
    ).as("delete-form");
    cy.get('[data-cy="form_card_dropdown"]').first().click();
    cy.get('[data-cy="form_card_delete_btn"]').first().click();
    cy.get('[data-cy="dialog_confirm_delete_btn"]').click();
    cy.wait("@delete-form");
  });
});
