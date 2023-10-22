<script lang="ts" setup>
import Notification from "./Notification.vue";
import { useNotifStore } from "../../store/notifications";

const notifStore = useNotifStore();
</script>

<template>
  <div>
    <Notification
      v-for="notif in notifStore.notifications"
      :notification="notif"
    />
  </div>
</template>
