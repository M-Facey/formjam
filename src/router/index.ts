import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/index.vue";

import AuthPage from "../pages/auth.vue";
import Login from "../components/auth/Login.vue";
import Signup from "../components/auth/Signup.vue";

import DashboardPage from "../pages/dashboard.vue";

import NotFoundPage from "../pages/404.vue";
import ErrorPage from "../pages/error.vue";

export default createRouter({
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
      component: AuthPage,
      meta: {
        layout: "Default",
      },
      children: [
        {
          path: "/auth/login",
          name: "Log in",
          component: Login,
        },
        {
          path: "signup",
          name: "Sign up",
          component: Signup,
        },
      ],
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardPage,
      meta: {
        layout: "AppLayout",
      },
    },
    {
      path: "/error",
      name: "Error",
      component: ErrorPage,
      meta: {
        layout: "Default",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundPage,
      meta: {
        layout: "Default",
      },
    },
  ],
});
