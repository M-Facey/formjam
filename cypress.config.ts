import { defineConfig } from "cypress";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

dotenv.config();

export default defineConfig({
  projectId: "qecres",
  e2e: {
    baseUrl: process.env.BASE_URL,
    specPattern: "cypress/specs/**/*.cy.{js,ts,jsx,tsx}",
    setupNodeEvents(on) {
      on("task", {
        getFreshUser() {
          return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: "password",
            confirmPassword: "password",
          };
        },
      });
    },
  },
  env: {
    API_URL: process.env.API_URL,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,
  },
});
