import type { DateValue } from "@internationalized/date";
import type { Grid } from "radix-vue/date";
import { Ref, ref } from "vue";

export { default as Calendar } from "./Calendar.vue";
export { default as CalendarCell } from "./CalendarCell.vue";
export { default as CalendarCellTrigger } from "./CalendarCellTrigger.vue";
export { default as CalendarGrid } from "./CalendarGrid.vue";
export { default as CalendarGridBody } from "./CalendarGridBody.vue";
export { default as CalendarGridHead } from "./CalendarGridHead.vue";
export { default as CalendarGridRow } from "./CalendarGridRow.vue";
export { default as CalendarHeadCell } from "./CalendarHeadCell.vue";
export { default as CalendarHeader } from "./CalendarHeader.vue";
export { default as CalendarHeading } from "./CalendarHeading.vue";
export { default as CalendarNextButton } from "./CalendarNextButton.vue";
export { default as CalendarPrevButton } from "./CalendarPrevButton.vue";

export const currentCalendarGrid = ref([]) as Ref<Grid<DateValue>[]>;
