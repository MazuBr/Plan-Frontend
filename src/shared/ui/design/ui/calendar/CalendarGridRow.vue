<script lang="ts" setup>
import { type HTMLAttributes, computed } from "vue"
import {
  CalendarGridRow,
  type CalendarGridRowProps,
  useForwardProps,
} from "radix-vue"
import { cn } from "@/shared/lib/utils"

const props = defineProps<
  CalendarGridRowProps & { class?: HTMLAttributes["class"] }
>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarGridRow :class="cn('flex', props.class)" v-bind="forwardedProps">
    <slot />
  </CalendarGridRow>
</template>
