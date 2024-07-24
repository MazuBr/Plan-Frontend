<script setup lang="ts">
import { getHoursAndMinutes } from "@/shared/lib/date-utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/design/ui/popover";
import { CalendarMonthData } from "../api";
import { ref } from "vue";
import Button from "@/shared/ui/design/ui/button/Button.vue";

withDefaults(
  defineProps<{ day: string; events: CalendarMonthData[]; fullDay: string }>(),
  {
    events: () => [],
  }
);

const popoverOpened = ref(false);
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
          class="w-fit cursor-pointer truncate flex items-center gap-1 hover:text-blue-400"
          @click.stop
        >
          <span class="text-2xl leading-none">•</span>
          {{ getHoursAndMinutes(event.dayEventStart) }}
          <span class="font-medium">{{ event.title }}</span>
        </li>
      </ul>
    </div>

    <div @click.stop>
      <Popover v-model:open="popoverOpened">
        <PopoverTrigger>
          <div
            v-if="events?.length > 3"
            class="cursor-pointer hover:text-blue-400"
          >
            + ещё {{ events?.length - 3 }}
          </div>
        </PopoverTrigger>
        <PopoverContent :side-offset="-100">
          <div class="flex justify-between flex-nowrap items-start">
            <div class="text-lg font-medium">{{ fullDay }}</div>
            <Button size="xs" variant="ghost" @click="popoverOpened = false"
              >x</Button
            >
          </div>

          <ul class="text-left text-sm">
            <li
              v-for="event in events"
              class="w-fit cursor-pointer truncate flex items-center gap-1 hover:text-blue-400"
              @click.stop
            >
              <span class="text-2xl leading-none">•</span>
              {{ getHoursAndMinutes(event.dayEventStart) }}
              <span class="font-medium">{{ event.title }}</span>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>

    <!-- TODO render schedule - first (4 or whatever fits) - then show +x more - that shows all events in popover -->
  </div>
</template>
