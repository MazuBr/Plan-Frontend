<script lang="ts" setup>
import { type HTMLAttributes, computed } from "vue"
import {
  CalendarHeadCell,
  type CalendarHeadCellProps,
  useForwardProps,
} from "radix-vue"
import { cn } from "@/shared/lib/utils"

const props = defineProps<
  CalendarHeadCellProps & { class?: HTMLAttributes["class"] }
>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarHeadCell
    :class="
      cn(
        'w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground',
        props.class
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeadCell>
</template>
