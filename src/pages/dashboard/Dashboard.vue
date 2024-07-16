<script setup lang="ts">
import { useSessionState } from "../../entities/user/model";
import { Button } from "@/shared/ui/design";

const session = useSessionState();
</script>

<template>
  <h1>Hello from dash🛹</h1>
  <pre>{{ session.user }}</pre>
  <Button @click="() => session.logout()">logout</Button>
</template>
