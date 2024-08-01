<script lang="ts" setup>
import { type HTMLAttributes, computed, watch } from "vue"
import {
  CalendarHeading,
  type CalendarHeadingProps,
  useForwardProps,
} from "radix-vue"
import { cn } from "@/shared/lib/utils"
import { Grid } from "radix-vue/date"
import { DateValue } from "@internationalized/date"
import { prettifyTimestamp } from "@/shared/lib/date-utils"

const props = defineProps<
  CalendarHeadingProps & {
    class?: HTMLAttributes["class"]
    grid?: Grid<DateValue>
    mode: "month" | "week"
    weekNumber?: number
  }
>()

const emits = defineEmits<{ gridUpdated: [] }>()

watch(
  () => props.grid,
  (val, oldValue) => {
    if (
      val &&
      oldValue &&
      val.cells[0].toString() !== oldValue.cells[0].toString()
    ) {
      emits("gridUpdated")
    }
  }
)

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)

const derivedFromGridHeading = computed(() => {
  if (props.weekNumber === undefined || !props.grid) return null

  if (props.mode === "week") {
    const firstDay = prettifyTimestamp(
      props.grid.rows[props.weekNumber][0].toString(),
      {
        hour: undefined,
        minute: undefined,
        second: undefined,
        fractionalSecondDigits: undefined,
      }
    )
    const lastDay = prettifyTimestamp(
      props.grid.rows[props.weekNumber][6].toString(),
      {
        hour: undefined,
        minute: undefined,
        second: undefined,
        fractionalSecondDigits: undefined,
      }
    )
    return `${firstDay} - ${lastDay}`
  }

  return null
})
</script>

<template>
  <CalendarHeading
    v-slot="{ headingValue }"
    :class="cn('text-sm font-medium', props.class)"
    v-bind="forwardedProps"
  >
    <slot :heading-value>
      <span v-if="derivedFromGridHeading">
        {{ derivedFromGridHeading }}
      </span>
      <span v-else>
        {{ headingValue }}
      </span>
    </slot>
  </CalendarHeading>
</template>
