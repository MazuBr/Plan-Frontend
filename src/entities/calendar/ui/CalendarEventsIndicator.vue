<script setup lang="ts">
import { getDayEvents } from "@/entities/schedule/model";
import { computed } from "vue";

const props = defineProps<{ date: string }>();

const eventCount = computed(() => getDayEvents(props.date).length);

function colorCodeByEventCount(count: number) {
  if (!count) return "bg-transparent";

  if (count > 10) return "bg-error";

  if (count > 5) return "bg-error-2";

  if (count > 2) return "bg-warning-1";

  return "bg-warning";
}
</script>

<template>
  <div v-if="eventCount" class="flex justify-center">
    <div
      :class="colorCodeByEventCount(eventCount)"
      class="h-2 w-2 rounded-lg -mt-[10px]"
    ></div>
  </div>
</template>
