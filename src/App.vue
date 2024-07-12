<script setup lang="ts">
import { onBeforeMount } from "vue";
import Routing from "./pages/index.vue";
import { useSessionState } from "./entities/user/model";

onBeforeMount(() => {
  // try
  const token = localStorage.getItem("jwt");
  if (token) {
    useSessionState().setJwt(token);
  }
});
</script>

<template>
  <Routing />
</template>
