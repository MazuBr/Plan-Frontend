<script setup lang="ts">
import { Calendar, currentCalendarGrid } from "@/shared/ui/design/ui/calendar"
import { computed } from "vue"
import { useRouteQuery } from "@vueuse/router"
import { parseDate } from "@internationalized/date"
import { type CalendarRootEmits } from "radix-vue"
import CalendarEventsIndicator from "./CalendarEventsIndicator.vue"
import { useFetchScheduleForCalendar } from "@/entities/schedule/model"

const today = new Date().toISOString().slice(0, 10)

const selectedDate = useRouteQuery<string | undefined>("date")
selectedDate.value = today // Отлично от того, если задавать initialValue для useRouteQuery

const computedDate = computed({
  get: () =>
    selectedDate.value ? parseDate(selectedDate.value) : parseDate(today),
  set: (val) => val,
})

function handleUpdate(event: CalendarRootEmits["update:modelValue"][number]) {
  if (!event) return // Убрать возможность сброса значения

  const computedValue = event.toString() || today
  if (computedValue === selectedDate.value) return
  selectedDate.value = computedValue
}
useFetchScheduleForCalendar(currentCalendarGrid)
</script>

<template>
  <Calendar v-model="computedDate" @update:model-value="handleUpdate">
    <template #indicator="{ date }">
      <CalendarEventsIndicator :date="date" />
    </template>
  </Calendar>
</template>
