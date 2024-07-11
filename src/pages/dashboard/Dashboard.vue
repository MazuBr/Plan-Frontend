<script setup lang="ts">
import { useRouter } from "vue-router";
import { useSessionState } from "../../entities/user/model";
import { Button } from "@/shared/ui/design";

const session = useSessionState();

if (!session.isAuth.value) {
  useRouter().push({ name: "login" });
}
</script>

<template>
  <h1>Hello from dash🛹</h1>
  <pre>{{ session.user }}</pre>
  <Button @click="() => session.logout()">logout</Button>
</template>
