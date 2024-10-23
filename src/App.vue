<script setup lang="ts">
import { onBeforeMount } from "vue"
import Routing from "./pages/index.vue"
import { useSessionState } from "./entities/user/model"
import { Toaster } from "@/shared/ui/design/ui/sonner"
import { useColorMode, useMagicKeys } from "@vueuse/core"

const colorMode = useColorMode()

useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === "i" && e.type === "keydown") {
      e.preventDefault()
      if (colorMode.value === "light") {
        colorMode.value = "dark"
      } else {
        colorMode.value = "light"
      }
    }
  },
})

onBeforeMount(async () => {
  await useSessionState().checkSession()
})
</script>

<template>
  <Toaster />
  <Routing />
</template>
