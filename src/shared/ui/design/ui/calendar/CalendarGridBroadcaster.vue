<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import type { Grid } from "radix-vue/date";
import { watch } from "vue";
import { currentCalendarGrid } from ".";

const props = defineProps<{ grid: Grid<DateValue>[] }>();

watch(
  () => props.grid,
  (grid) => (currentCalendarGrid.value = grid),
  {
    immediate: true,
    deep: true,
  }
);
</script>
