<script lang="ts" setup>
import { Toaster as Sonner, type ToasterProps } from "vue-sonner"

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    :toast-options="{
      duration: 8000,
      classes: {
        toast:
          'group toast group-[.toaster]:bg-monochrome-1.5  group-[.toaster]:border-monochrome-6 group-[.toaster]:shadow-sm group-[.toaster]:max-w-[500px]',
        title: 'text-nowrap',
        description: 'group-[.toast]:text-muted-foreground line-clamp-4',
        actionButton:
          'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton:
          'group-[.toast]:bg-monochrome-2 group-[.toast]:text-monochrome-7',
        error:
          'group-[.toaster]:text-error-1 group-[.toaster]:data-[styled=true]:border-error-1',
        success:
          'group-[.toaster]:text-success-1 group-[.toaster]:data-[styled=true]:border-success-1',
        warning:
          'group-[.toaster]:text-warning-1 group-[.toaster]:data-[styled=true]:border-warning-1',
      },
    }"
  />
</template>
