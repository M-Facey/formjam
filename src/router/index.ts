import { createRouter, createWebHistory } from "vue-router";
import { middleware } from "@/router/middleware";

import HomePage from "@/pages/index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
      meta: {
        layout: "Default",
      },
    },
    {
      path: "/auth",
      name: "Auth",
      redirect: (to) => {
        if (to.name === "Signup" || to.name === "Login") {
          return { path: to.fullPath };
        }
        return { path: "/auth/login" };
      },
      meta: {
        layout: "Auth",
      },
      children: [
        {
          path: "/auth/login",
          name: "Login",
          component: () => import("@/components/auth/Login.vue"),
        },
        {
          path: "signup",
          name: "Signup",
          component: () => import("@/components/auth/Signup.vue"),
        },
        {
          path: "reset-your-password",
          name: "PasswordRest",
          component: () => import("@/components/auth/PasswordReset.vue"),
        },
        {
          path: "confirm-password-reset/:token(.*)",
          name: "ConfirmPasswordReset",
          component: () => import("@/components/auth/ConfirmPassword.vue"),
        },
      ],
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("@/pages/dashboard.vue"),
      meta: {
        layout: "Dashboard",
        authRequired: true,
      },
    },
    {
      path: "/form/:formId/edit",
      name: "EditForm",
      component: () => import("@/pages/form/edit.vue"),
      meta: {
        layout: "Form",
        authRequired: true,
      },
    },
    {
      path: "/error",
      name: "Error",
      component: () => import("@/pages/error.vue"),
      meta: {
        layout: "Default",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/pages/404.vue"),
      meta: {
        layout: "Default",
      },
    },
  ],
});

router.beforeEach(middleware);
export default router;
