import { defineStore } from "pinia";
import { usePreferredColorScheme } from "@vueuse/core";

export const useThemeStore = defineStore({
  id: "theme",
  state: () => ({
    currentTheme: "",
  }),
  actions: {
    checkTheme(): string {
      const systemTheme = usePreferredColorScheme();
      this.currentTheme = localStorage.getItem("x-theme") || "";

      if (this.currentTheme === "") {
        if (systemTheme.value === "dark") {
          this.currentTheme = "dark";
        } else {
          this.currentTheme = "light";
        }
        localStorage.setItem("x-theme", this.currentTheme);
      }
      if (
        this.currentTheme === "dark" &&
        !document.documentElement.classList.contains("dark")
      ) {
        document.documentElement.classList.add("dark");
      } else if (
        this.currentTheme === "light" &&
        document.documentElement.classList.contains("dark")
      ) {
        document.documentElement.classList.remove("dark");
      }
      return this.currentTheme;
    },
    changeTheme() {
      if (this.currentTheme === "dark") {
        this.currentTheme = "light";
        document.documentElement.classList.remove("dark");
      } else {
        this.currentTheme = "dark";

        if (!document.documentElement.classList.contains("dark")) {
          document.documentElement.classList.add("dark");
        }
      }
      localStorage.setItem("x-theme", this.currentTheme);
    },
  },
});
