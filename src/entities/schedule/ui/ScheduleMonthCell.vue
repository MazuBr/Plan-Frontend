<script setup lang="ts">
import { getHoursAndMinutes } from "@/shared/lib/date-utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/design/ui/popover"
import { CalendarData } from "../api"
import { ref } from "vue"
import Button from "@/shared/ui/design/ui/button/Button.vue"
import UpdateEventDialog from "@/entities/event/ui/UpdateEventDialog.vue"
import { LocationQuery } from "vue-router"

const props = withDefaults(
  defineProps<{
    day: string
    events: CalendarData["events"]
    fullDay: string
    notSameMonth?: boolean
  }>(),
  {
    events: () => [],
  }
)

const popoverOpened = ref(false)

function applySelection(query: LocationQuery) {
  if (props.notSameMonth) return "opacity-50"

  if (props.fullDay === query.date)
    return "border border-monochrome-6 rounded-md"
}
</script>

<template>
  <div
    :class="applySelection($route.query)"
    class="h-full flex flex-col justify-between py-2 pr-2"
  >
    <div>
      <div class="text-right">
        <span class="text-monochrome-7">{{ day }}</span>
      </div>

      <div @click.stop>
        <ul class="text-left text-sm">
          <li
            v-for="event in events?.slice(0, 3)"
            class="cursor-pointer hover:text-blue-400"
          >
            <UpdateEventDialog :event-data="event">
              <template #trigger>
                <div class="truncate flex items-center gap-1">
                  <span class="text-2xl leading-none">•</span>
                  {{ getHoursAndMinutes(event.dayEventStart) }}
                  <span class="font-medium">{{ event.title }}</span>
                </div>
              </template>
            </UpdateEventDialog>
          </li>
        </ul>
      </div>
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

          <div @click.stop>
            <ul class="text-left text-sm">
              <li
                v-for="event in events"
                class="cursor-pointer hover:text-blue-400"
              >
                <UpdateEventDialog :event-data="event">
                  <template #trigger>
                    <div class="w-fit truncate flex items-center gap-1">
                      <span class="text-2xl leading-none">•</span>
                      {{ getHoursAndMinutes(event.dayEventStart) }}
                      <span class="font-medium">{{ event.title }}</span>
                    </div>
                  </template>
                </UpdateEventDialog>
              </li>
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>
