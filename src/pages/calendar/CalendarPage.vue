<script setup lang="ts">
import DefaultLayout from "@/shared/ui/DefaultLayout.vue"
import Calendar from "@/entities/calendar/ui/CalendarMain.vue"
import ScheduleMonth from "@/entities/schedule/ui/ScheduleMonth.vue"
import { useSessionState } from "@/entities/user/model"
import { Button } from "@/shared/ui/design"
import { type Component, computed } from "vue"
import ScheduleDay from "../../entities/schedule/ui/ScheduleDay.vue"
import ScheduleWeek from "@/entities/schedule/ui/ScheduleWeek.vue"
import ScheduleModeSelector from "@/entities/schedule/ui/ScheduleModeSelector.vue"
import { useScheduleMode } from "@/entities/schedule/model"

const session = useSessionState()
const scheduleMode = useScheduleMode()

const scheduleComponent = computed(() => {
  const _dict: Record<(typeof scheduleMode)["value"], Component | "div"> = {
    day: ScheduleDay,
    month: ScheduleMonth,
    week: ScheduleWeek,
  }

  return _dict[scheduleMode.value]
})
</script>

<template>
  <DefaultLayout>
    <template #main-content>
      <div class="type-two">
        <div class="type-fix w-80">
          <div class="h-full flex flex-col justify-between">
            <Calendar />
            <div>
              <Button @click="() => session.logout()">Выйти из системы</Button>
            </div>
          </div>
        </div>
        <div>
          <component :is="scheduleComponent">
            <template #schedule-handler>
              <ScheduleModeSelector />
            </template>
          </component>
        </div>
      </div>
    </template>
  </DefaultLayout>
</template>
