<script setup lang="ts">
defineProps<{ fullDay: string }>()
</script>

<template>
  <div class="flex w-full gap-[1px] flex-col">
    <div v-for="h in 24" class="h-12 bg-monochrome-1 text-[8px]"></div>
  </div>
</template>
