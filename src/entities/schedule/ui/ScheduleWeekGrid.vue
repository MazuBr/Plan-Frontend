<script setup lang="ts">
import { DateValue } from "@internationalized/date"
import ScheduleDayCell from "./ScheduleDayCell.vue"
import { daysOfWeek } from "@/entities/event/model"
import { getTranslatedDay } from "@/shared/lib/date-utils"
import { getDayEvents, useFetchScheduleForCalendar } from "../model"

const props = defineProps<{ days: string[]; grid: DateValue[] }>()

const { scheduleQuery } = useFetchScheduleForCalendar(
  () => [{ cells: props.grid }] as any
)

function getScheduleTime() {
  return Array(24)
    .fill(0)
    .map((_, idx) => `${idx}:00`)
}
</script>

<template>
  <div
    class="calendar-grid-week bg-monochrome-2 dark:bg-monochrome-9.5"
    :class="scheduleQuery.isLoading.value ? 'opacity-50' : 'opacity-100'"
  >
    <div></div>
    <div v-for="(weekDay, idx) in daysOfWeek" class="bg-monochrome-2 dark:bg-monochrome-8">
      <div class="flex gap-2 justify-center">
        <span> {{ getTranslatedDay(weekDay) }} </span>
        <span>
          {{ grid[idx].day.toString().padStart(2, "0") }}
        </span>
      </div>
    </div>
    <div class="flex w-full gap-[1px] flex-col text-right">
      <div v-for="h in getScheduleTime()" class="h-12 text-sm">{{ h }}</div>
    </div>
    <div
      v-for="day in grid"
    >
      <ScheduleDayCell
        :key="getDayEvents(day).length"
        :events="getDayEvents(day)"
        :dark="$route.query.date === day.toString()"
        :full-day="day.toString()"
      />
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
