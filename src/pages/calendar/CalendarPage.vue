<script setup lang="ts">
import DefaultLayout from "@/shared/ui/DefaultLayout.vue";
import Calendar from "@/entities/calendar/ui/CalendarMain.vue";
import ScheduleTemp from "@/entities/schedule/ui/ScheduleTemp.vue";
</script>

<template>
  <DefaultLayout>
    <template #main-content>
      <div class="type-two">
        <div class="type-fix w-80"><Calendar /></div>
        <div><ScheduleTemp /></div>
      </div>
    </template>
  </DefaultLayout>
</template>
