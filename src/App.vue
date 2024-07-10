<script setup lang="ts">
import { watch } from "vue";
import Routing from "./pages/index.vue";
import { useSessionState } from "./entities/user/model";
import { useRouter } from "vue-router";

const router = useRouter();
const session = useSessionState();
watch(
  () => session.isAuth.value,
  (val) => {
    if (!val) {
      router.replace({ path: "/login" });
    } else {
      router.replace({ path: "/dashboard" });
    }
  },
  { immediate: true }
);
</script>

<template>
  <Routing />
</template>
