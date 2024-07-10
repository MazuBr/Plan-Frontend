<script setup lang="ts">
defineProps<{ name: string; comment: string }>();
</script>

<template>
  <div>
    <div data-testid="name">{{ name }}</div>
    <div data-testid="comment">{{ comment }}</div>
  </div>
</template>
