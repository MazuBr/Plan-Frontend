<script setup lang="ts">
import { DateValue } from "@internationalized/date"

defineProps<{ days: string[]; grid: DateValue[] }>()
</script>

<template>
  <div>
    <div v-for="weekDay in days">{{ weekDay }}</div>
  </div>
  <div>
    <div v-for="day in grid">{{ day.toString() }}</div>
  </div>
</template>
