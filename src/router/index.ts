import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/index.vue";
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
