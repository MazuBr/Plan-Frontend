<script setup lang="ts">
import { DateValue } from "@internationalized/date"
import ScheduleDayCell from "./ScheduleDayCell.vue"

defineProps<{ days: string[]; grid: DateValue[] }>()

function getScheduleTime() {
  return Array(24)
    .fill(0)
    .map((_, idx) => `${idx}:00`)
}
</script>

<template>
  <div class="calendar-grid-week bg-monochrome-2">
    <div></div>
    <div v-for="weekDay in days" class="bg-monochrome-2 text-center">
      {{ weekDay }}
    </div>
    <div class="flex w-full gap-[1px] flex-col text-right">
      <div v-for="h in getScheduleTime()" class="h-12 text-sm">{{ h }}</div>
    </div>
    <div v-for="day in grid">
      <ScheduleDayCell :full-day="day.toString()" />
    </div>
  </div>
</template>

<style scoped>
.calendar-grid-week {
  display: grid;

  overflow: auto;
  height: calc(100dvh - 12px - 40px - 2px);

  grid-template-columns: 48px repeat(7, minmax(0, 1fr));
  gap: 1px;
  grid-auto-flow: row dense;
  grid-template-rows: repeat(minmax(0, 1fr), 1);
}
</style>
