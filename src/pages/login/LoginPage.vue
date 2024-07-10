<script setup lang="ts">
import { useRouter } from "vue-router";
import { useSessionState } from "../../entities/user/model";
import { Button } from "../../shared/ui/design";

const session = useSessionState();

if (session.isAuth.value) {
  useRouter().push({ name: "dashboard" });
}
</script>

<template>
  <h1>Hello from 🪵in📃.</h1>
  <Button @click="() => session.login()">login</Button>
</template>
