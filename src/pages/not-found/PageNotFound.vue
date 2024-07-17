<script setup lang="ts">
import Button from "@/shared/ui/design/ui/button/Button.vue";
</script>

<template>
  <h1>i am 📃 ⛔ 🔍</h1>
  <router-link :to="{ name: 'dashboard' }">
    <Button>На главную</Button>
  </router-link>
</template>
