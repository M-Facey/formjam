import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    specPattern: "cypress/specs/**/*.cy.{js,ts,jsx,tsx}"
  },
  env: {
    API_URL: process.env.API_URL,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,
  },
});
