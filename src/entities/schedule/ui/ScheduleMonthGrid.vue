<script setup lang="ts">
import CreateEventDialog from "@/entities/event/ui/CreateEventDialog.vue";
import type { DateValue } from "@internationalized/date";
import type { Grid } from "radix-vue/date";
import ScheduleMonthCell from "./ScheduleMonthCell.vue";
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { scheduleService } from "../api";

const props = defineProps<{
  days: string[];
  calendarGrid: Grid<DateValue>[];
}>();

const computedStartEndEpoch = computed(() => {
  const epochStart = Math.floor(
    new Date(props.calendarGrid[0].cells[0].toString()).getTime() / 1000
  );
  const epochEnd = Math.floor(
    new Date(props.calendarGrid[0].cells[34].toString()).getTime() / 1000
  );

  return [epochStart, epochEnd] as const;
});

const { data: groupedEvents, isLoading } = useQuery({
  queryKey: ["calendar", "month", computedStartEndEpoch],
  queryFn: () =>
    scheduleService.getters.getScheduleForMonth(
      computedStartEndEpoch.value[0],
      computedStartEndEpoch.value[1]
    ),
});

function getDayEvents(cell: DateValue) {
  return groupedEvents.value?.find((group) => group.day === cell.toString())
    ?.events;
}
</script>

<template>
  <div
    class="calendar-grid h-full bg-monochrome-2"
    :class="isLoading ? 'opacity-50' : 'opacity-100'"
  >
    <div v-for="day in days" :key="day" class="bg-monochrome-2 text-center">
      {{ day }}
    </div>

    <div
      v-for="cell in calendarGrid[0].cells"
      class="bg-monochrome-1 hover:bg-monochrome-2"
    >
      <CreateEventDialog :initial-date="cell">
        <template #trigger>
          <ScheduleMonthCell
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
