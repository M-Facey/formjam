import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import pb from "../db/pocketBase";

export const middleware = (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const isAuthenticated = pb.authStore.isValid;
  const authBlackList = ["Login", "Signup", "Home"];

  if (to.meta.authRequired && !isAuthenticated) {
    next({ name: "Login" });
  } else if (
    isAuthenticated &&
    to.name &&
    authBlackList.includes(to.name.toString())
  ) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
};
