<script setup lang="ts">
import { onBeforeMount } from "vue"
import Routing from "./pages/index.vue"
import { useSessionState } from "./entities/user/model"
import { Toaster } from "@/shared/ui/design/ui/sonner"

onBeforeMount(async () => {
  await useSessionState().checkSession()
})
</script>

<template>
  <Toaster />
  <Routing />
</template>
