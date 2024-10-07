<script lang="ts" setup>
import { useColorMode } from "@vueuse/core"
import { computed } from "vue"
import { Toaster as Sonner, type ToasterProps } from "vue-sonner"

const props = defineProps<ToasterProps>()
const mode = useColorMode()

const theme = computed<"light" | "dark" | "system">(() =>
  mode.value === "dark" ? "dark" : mode.value === "light" ? "light" : "system"
)
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    :theme="theme"
    :toast-options="{
      duration: 8000,
    }"
  />
</template>
