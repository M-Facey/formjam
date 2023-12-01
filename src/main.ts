import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia";

import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import "primevue/resources/themes/lara-light-green/theme.css";

createApp(App)
  .use(router)
  .use(createPinia())
  .use(PrimeVue)
  .use(ConfirmationService)
  .use(ToastService)
  .mount("#app");
