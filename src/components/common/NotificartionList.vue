<script lang="ts" setup>
import Notification from "@/components/common/Notification.vue";
import { useNotifStore } from "@/store/notifications";

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
