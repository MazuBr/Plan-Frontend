<script setup lang="ts">
import { onBeforeMount } from "vue";
import Routing from "./pages/index.vue";
import { useSessionState } from "./entities/user/model";

onBeforeMount(async () => {
  await useSessionState().checkSession();
});
</script>

<template>
  <Routing />
</template>
