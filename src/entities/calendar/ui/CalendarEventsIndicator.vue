<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ date: string }>();

const testClass = computed(() =>
  new Date(props.date).getTime() > new Date().getTime()
    ? "bg-success-1"
    : "bg-error-1"
);

// get event counts by date?
</script>

<template>
  <div class="flex justify-center">
    <div :class="testClass" class="h-2 w-2 rounded-lg -mt-[10px]"></div>
  </div>
</template>
