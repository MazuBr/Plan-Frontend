<script setup lang="ts">
import CreateEventDialog from "@/entities/event/ui/CreateEventDialog.vue"
import type { DateValue } from "@internationalized/date"
import type { Grid } from "radix-vue/date"
import ScheduleMonthCell from "./ScheduleMonthCell.vue"
import { getDayEvents, useFetchScheduleForCalendar } from "../model"

const props = defineProps<{
  days: string[]
  calendarGrid: Grid<DateValue>[]
}>()

const { scheduleQuery } = useFetchScheduleForCalendar(() => props.calendarGrid)

function determineIfNotSameMonth(month: number) {
  const monthCount: Record<number, number> = {}

  props.calendarGrid[0].cells.forEach((item) => {
    const month = item.month
    monthCount[month] = (monthCount[month] || 0) + 1
  })

  let mostPopularMonth = null
  let maxCount = 0

  for (const month in monthCount) {
    if (monthCount[month] > maxCount) {
      maxCount = monthCount[month]
      mostPopularMonth = +month
    }
  }

  return month !== mostPopularMonth
}
</script>

<template>
  <div
    class="calendar-grid h-full bg-monochrome-2"
    :class="scheduleQuery.isLoading.value ? 'opacity-50' : 'opacity-100'"
  >
    <div v-for="day in days" :key="day" class="bg-monochrome-2 text-center">
      {{ day }}
    </div>

    <div
      v-for="cell in calendarGrid[0].cells"
      :key="cell.toString()"
      class="bg-monochrome-1 hover:bg-monochrome-2"
    >
      <CreateEventDialog :initial-date="cell">
        <template #trigger>
          <ScheduleMonthCell
            :not-same-month="determineIfNotSameMonth(cell.month)"
            :events="getDayEvents(cell)"
            :day="cell.day.toString()"
            :full-day="cell.toString()"
          />
        </template>
      </CreateEventDialog>
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
