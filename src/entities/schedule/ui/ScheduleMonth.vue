<script lang="ts" setup>
import { type HTMLAttributes, computed } from "vue";
import {
  CalendarRoot,
  type CalendarRootEmits,
  type CalendarRootProps,
  useForwardPropsEmits,
} from "radix-vue";
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNextButton,
  CalendarPrevButton,
} from "@/shared/ui/design/ui/calendar";
import { cn } from "@/shared/lib/utils";
import ScheduleMonthGrid from "./ScheduleMonthGrid.vue";

const props = defineProps<
  CalendarRootProps & { class?: HTMLAttributes["class"] }
>();

const emits = defineEmits<CalendarRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <CalendarRoot
    v-slot="{ grid, weekDays }"
    class="h-full"
    :class="cn('', props.class)"
    v-bind="forwarded"
  >
    <div class="flex gap-3 no-wrap">
      <CalendarHeader class="w-fit gap-3">
        <CalendarPrevButton />
        <CalendarHeading class="text-xl" />
        <CalendarNextButton />
      </CalendarHeader>

      <div>
        <span class="italic">выбор месяц/неделя/день</span>
      </div>
    </div>

    <ScheduleMonthGrid
      style="height: calc(100% - 34px)"
      :days="weekDays"
      :calendar-grid="grid"
    />
  </CalendarRoot>
</template>
