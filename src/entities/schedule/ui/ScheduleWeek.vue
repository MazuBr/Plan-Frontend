<script lang="ts" setup>
import { type HTMLAttributes, computed, ref, watch } from "vue"
import {
  CalendarRoot,
  type CalendarRootEmits,
  type CalendarRootProps,
  useForwardPropsEmits,
} from "radix-vue"
import {
  CalendarHeader,
  CalendarHeading,
  CalendarNextButton,
  CalendarPrevButton,
} from "@/shared/ui/design/ui/calendar"
import { cn } from "@/shared/lib/utils"
import { useRouteQuery } from "@vueuse/router"
import { DateValue, parseDate } from "@internationalized/date"
import ScheduleWeekGrid from "./ScheduleWeekGrid.vue"
import { getISOWeekNumber } from "@/shared/lib/date-utils"

const props = defineProps<
  CalendarRootProps & { class?: HTMLAttributes["class"] }
>()

const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const selectedDate = useRouteQuery<string | undefined>("date")

const computedDate = computed({
  get: () => (selectedDate.value ? parseDate(selectedDate.value) : undefined),
  set: (val) => val,
})

const currentWeekIndex = ref(
  getISOWeekNumber(selectedDate.value || new Date().toDateString()) - 1 || 0
)
watch(selectedDate, (date) => {
  if (!date) return

  const x = getISOWeekNumber(date)
  currentWeekIndex.value = x - 1
})

function handleIncrement(dv: DateValue) {
  currentWeekIndex.value++
  return dv
}
function handleDecrement(dv: DateValue) {
  currentWeekIndex.value--
  return dv
}
</script>

<template>
  <CalendarRoot
    v-slot="{ grid, weekDays }"
    class="h-full"
    :class="cn('', props.class)"
    v-bind="forwarded"
    locale="ru"
    :key="currentWeekIndex"
    v-model:model-value="computedDate"
  >
    <div class="flex gap-3 no-wrap justify-between">
      <CalendarHeader class="w-1/2">
        <CalendarPrevButton
          :prev-page="currentWeekIndex === 0 ? undefined : handleDecrement"
        />
        <CalendarHeading
          :grid="grid[0]"
          class="text-xl"
          mode="week"
          :week-number="currentWeekIndex"
          @grid-updated="currentWeekIndex = 0"
        />
        <CalendarNextButton
          :next-page="currentWeekIndex === 4 ? undefined : handleIncrement"
        />
      </CalendarHeader>

      <div>
        <slot name="schedule-handler" />
      </div>
    </div>

    <ScheduleWeekGrid :grid="grid[0].rows[currentWeekIndex]" :days="weekDays" />
  </CalendarRoot>
</template>
