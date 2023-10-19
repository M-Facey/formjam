import { defineStore } from "pinia";

export const useNotifStore = defineStore({
  id: "notification",
  state: () => ({
    notifications: [] as string[],
  }),
});
