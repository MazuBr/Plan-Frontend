<script setup lang="ts">
import { CalendarHumanReadable } from "@/shared/api/gql/graphql";
import { getHoursAndMinutes } from "@/shared/lib/date-utils";
import { CalendarMonthData } from "../api";

// TODO get schedule=event[]
withDefaults(defineProps<{ day: string; events: CalendarMonthData[] }>(), {
  events: () => [],
});
</script>

<template>
  <div class="h-full flex flex-col justify-between py-2 pr-2">
    <div>
      <div class="text-right">
        <span class="text-monochrome-7">{{ day }}</span>
      </div>

      <ul class="text-left text-sm">
        <li
          v-for="event in events?.slice(0, 3)"
          class="cursor-pointer truncate flex items-center gap-1 hover:text-blue-400"
          @click.stop
        >
          <span class="text-2xl leading-none">•</span>
          {{ getHoursAndMinutes(event.dayEventStart) }}
          <span class="font-medium">{{ event.title }}</span>
        </li>
      </ul>
    </div>

    <div
      v-if="events?.length > 3"
      class="cursor-pointer hover:text-blue-400"
      @click.stop
    >
      + ещё {{ events?.length - 3 }}
    </div>

    <!-- TODO render schedule - first (4 or whatever fits) - then show +x more - that shows all events in popover -->
  </div>
</template>
