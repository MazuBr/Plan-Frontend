<script setup lang="ts">
// TODO get schedule=event[]
defineProps<{ day: string }>();
</script>

<template>
  <div class="h-full">
    <span class="text-monochrome-7">{{ day }}</span>

    <!-- TODO render schedule - first (4 or whatever fits) - then show +x more - that shows all events in popover -->
  </div>
</template>
