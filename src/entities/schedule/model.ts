import { DateValue } from "@internationalized/date"
import { useQuery } from "@tanstack/vue-query"
import { useLocalStorage } from "@vueuse/core"
import { useRouteParams } from "@vueuse/router"
import { CalendarData, scheduleService } from "./api"
import { computed, MaybeRefOrGetter, toValue, watch } from "vue"
import { ref } from "vue"
import type { Grid } from "radix-vue/date"

export type ScheduleMode = "day" | "week" | "month"

export const useScheduleMode = () => {
  return useRouteParams<ScheduleMode>(
    "mode",
    useLocalStorage<ScheduleMode>("scheduleMode", "month")
  )
}

export function getDayEvents(cell: DateValue | string) {
  return dayEventsMap.value.get(cell.toString()) || []
}

export const dayEventsMap = ref(new Map<string, CalendarData["events"]>())

export const useFetchScheduleForCalendar = (
  calendar: MaybeRefOrGetter<Grid<DateValue>[]>
) => {
  const computedStartEndEpoch = computed(() => {
    const cells = toValue(calendar)[0]?.cells || []
    const firstDate = new Date(cells.at(0)?.toString() || "")
    const lastDate = new Date(cells.at(-1)?.toString() || "")
    const epochStart = Math.floor(firstDate.getTime() / 1000)
    const epochEnd = Math.floor(lastDate.getTime() / 1000)

    return [epochStart, epochEnd] as const
  })

  const scheduleQuery = useQuery({
    queryKey: ["calendar", computedStartEndEpoch],
    queryFn: () =>
      scheduleService.getters.getScheduleForMonth(
        computedStartEndEpoch.value[0],
        computedStartEndEpoch.value[1]
      ),
    staleTime: 60_000,
  })

  watch(
    () => scheduleQuery.data.value,
    (data) => {
      if (!data || !data.length) return

      for (const day of data) {
        dayEventsMap.value.set(day.day, day.events)
      }
    },
    { immediate: true }
  )

  return {
    scheduleQuery,
  }
}
