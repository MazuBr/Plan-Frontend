<script setup lang="ts">
import DefaultLayout from "@/shared/ui/DefaultLayout.vue";
import Calendar from "@/entities/calendar/ui/CalendarMain.vue";
import ScheduleMonth from "@/entities/schedule/ui/ScheduleMonth.vue";
import { useSessionState } from "@/entities/user/model";
import { Button } from "@/shared/ui/design";

const session = useSessionState();
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
        <div><ScheduleMonth /></div>
      </div>
    </template>
  </DefaultLayout>
</template>
