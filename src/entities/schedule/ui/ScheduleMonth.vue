<script lang="ts" setup>
import { type HTMLAttributes, computed } from "vue"
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
import ScheduleMonthGrid from "./ScheduleMonthGrid.vue"
import { useRouteQuery } from "@vueuse/router"
import { parseDate } from "@internationalized/date"

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
</script>

<template>
  <CalendarRoot
    v-slot="{ grid, weekDays }"
    class="h-full"
    :class="cn('', props.class)"
    v-bind="forwarded"
    locale="ru"
    v-model:model-value="computedDate"
  >
    <div class="flex gap-3 no-wrap justify-between">
      <CalendarHeader class="w-1/2">
        <CalendarPrevButton />
        <CalendarHeading class="text-xl" mode="month" />
        <CalendarNextButton />
      </CalendarHeader>

      <div>
        <slot name="schedule-handler" />
      </div>
    </div>

    <ScheduleMonthGrid
      style="height: calc(100% - 40px)"
      :days="weekDays"
      :calendar-grid="grid"
    />
  </CalendarRoot>
</template>
