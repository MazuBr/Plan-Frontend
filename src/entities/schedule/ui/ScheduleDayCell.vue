<script setup lang="ts">
import { computed, onMounted } from "vue"
import { CalendarData } from "../api"
import { getHoursAndMinutes } from "@/shared/lib/date-utils"
import { cn } from "@/shared/lib/utils"
import { getMonochromeByTheme } from "@/shared/lib/theme-manager"

const props = defineProps<{
  fullDay: string
  events: CalendarData["events"]
  dark?: boolean
}>()

onMounted(() => {
  props.events.forEach((event) => {
    const [startHour, startMinute] = getHoursAndMinutes(event.dayEventStart)
      .split(":")
      .map((v) => +v)
    const startDay = new Date(event.dayEventStart)
      .getDate()
      .toString()
      .padStart(2, "0")
    const [endHour, endMinute] = getHoursAndMinutes(event.endTime)
      .split(":")
      .map((v) => +v)

    const startBoardElement = document.querySelector(
      `#d${startDay} [data-time-value="${[startHour, startMinute]}"]`
    )
    let nextElementSibling = startBoardElement?.nextElementSibling

    if (!startBoardElement) return

    startBoardElement.classList.add("bg-blue-400")
    startBoardElement.classList.add("text-xs")
    startBoardElement.textContent = event.title

    let duration = Math.abs(
      startHour * 60 + startMinute - (endHour * 60 + endMinute)
    )
    while (duration > 0) {
      nextElementSibling?.classList.add("bg-blue-400")
      nextElementSibling = nextElementSibling?.nextElementSibling

      duration--
    }
  })
})

const comptedStyle = computed(() =>
  getMonochromeByTheme({ darkVariant: 10, lightVariant: 4 })
)
</script>

<template>
  <div class="flex w-full gap-[1px] flex-col" :id="'d' + fullDay.split('-')[2]">
    <div
      v-for="h in 24"
      :class="
        cn(
          'relative h-12 bg-monochrome-1 dark:bg-monochrome-9 text-[14px] hour-grid',
          dark ? comptedStyle : ''
        )
      "
    >
      <div v-for="(hs, idx) in 60" :data-time-value="[h - 1, idx]"></div>
    </div>
  </div>
</template>

<style scoped>
.hour-grid {
  display: grid;
  grid-auto-rows: repeat(60, 1fr);
}
</style>
