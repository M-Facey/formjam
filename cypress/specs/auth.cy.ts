describe("Auth Test", () => {
  it("should log in successfully", () => {
    cy.login();
  });

  it("should log out successfully", () => {
    cy.login();
    cy.logout();
  });
});
