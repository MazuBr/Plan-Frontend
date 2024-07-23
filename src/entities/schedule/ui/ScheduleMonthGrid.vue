<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import type { Grid } from "radix-vue/date";

defineProps<{ days: string[]; calendarGrid: Grid<DateValue>[] }>();
</script>

<template>
  <div class="calendar-grid h-full bg-monochrome-2">
    <div v-for="day in days" :key="day" class="bg-monochrome-2 text-center">
      {{ day }}
    </div>

    <div
      v-for="cell in calendarGrid[0].cells"
      class="bg-monochrome-1 text-right hover:bg-monochrome-2"
    >
      <span class="text-monochrome-7">{{ cell.day }}</span>
    </div>
  </div>
</template>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 1px;
  grid-auto-flow: row dense;
  grid-template-rows:
    32px minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)
    minmax(0, 1fr);
}
</style>
