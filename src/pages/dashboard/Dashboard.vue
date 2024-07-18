<script setup lang="ts">
import { restClient } from "@/shared/api/base";
import { useSessionState } from "../../entities/user/model";
import { Button } from "@/shared/ui/design";
import { useQuery } from "@tanstack/vue-query";

const session = useSessionState();

async function callAboba() {
  await restClient.user.abobaUserAbobaPost();
}
</script>

<template>
  <h1>Hello from dash🛹</h1>
  <Button @click="() => session.logout()">logout</Button>
  <Button @click="() => callAboba()">Call aboba</Button>
</template>
