<script setup lang="ts">
import { tanstackQueryClient } from "@/main";
import { QueryCacheNotifyEvent } from "@tanstack/vue-query";
import { computed, onUnmounted, ref, watch } from "vue";

const props = defineProps<{ date: string }>();

const eventCount = ref(0);

function isObjectWithDayProperty(value: unknown): value is { day: string } {
  if (typeof value === "object" && value !== null) {
    const obj = value as Record<string, unknown>;

    return "day" in obj && typeof obj.day === "string";
  }
  return false;
}

function deriveEventCountFromCacheData(ev: QueryCacheNotifyEvent) {
  if (!ev.query.queryKey?.includes("calendar")) return;

  const eventData = ev.query.state.data?.find((ev: unknown) =>
    isObjectWithDayProperty(ev) ? ev.day === props.date : false
  )?.events.length;
  eventCount.value = eventData;
}

function colorCodeByEventCount(count: number) {
  if (!count) return "bg-transparent";

  if (count > 10) return "bg-error";

  if (count > 5) return "bg-error-2";

  if (count > 2) return "bg-warning-1";

  return "bg-warning";
}

const unsub = tanstackQueryClient
  .getQueryCache()
  .subscribe(deriveEventCountFromCacheData);

onUnmounted(unsub);
</script>

<template>
  <div v-if="eventCount" class="flex justify-center">
    <div
      :class="colorCodeByEventCount(eventCount)"
      class="h-2 w-2 rounded-lg -mt-[10px]"
    ></div>
  </div>
</template>
