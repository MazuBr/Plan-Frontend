<script lang="ts" setup>
import { type HTMLAttributes, computed } from "vue"
import {
  CalendarGrid,
  type CalendarGridProps,
  useForwardProps,
} from "radix-vue"
import { cn } from "@/shared/lib/utils"

const props = defineProps<
  CalendarGridProps & { class?: HTMLAttributes["class"] }
>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarGrid
    :class="cn('w-full border-collapse space-y-1', props.class)"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarGrid>
</template>
