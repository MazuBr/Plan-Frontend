<script setup lang="ts">
import Button from "@/shared/ui/design/ui/button/Button.vue";
</script>

<template>
  <div>
    Логина нет, есть только
    <router-link :to="{ name: 'register' }">
      <Button>Регистрация</Button>
    </router-link>
  </div>
</template>
