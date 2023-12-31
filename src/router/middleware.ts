import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import pb from "@/db/pocketBase";

export const middleware = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const isAuthenticated = pb.authStore.isValid;
  const authBlackList = ["Login", "Signup", "Home"];
  const routeName = to.meta?.title;

  if (to.meta.authRequired && !isAuthenticated) {
    next({ name: "Login" });
  } else if (
    isAuthenticated &&
    to.name &&
    authBlackList.includes(to.name.toString())
  ) {
    next({ name: "Dashboard" });
  } else if (
    to.name === "SuccessForm" &&
    !(from.name === "PreviewForm" || from.name === "ViewForm")
  ) {
    // NOTE: this redirects to the either home or previous page when navigating to the 
    //        success page from a page that is not the view/preview page.
    next(from.fullPath);
  } else {
    next();
  }

  if (routeName) document.title = `${routeName} | FormJAM`;
};
