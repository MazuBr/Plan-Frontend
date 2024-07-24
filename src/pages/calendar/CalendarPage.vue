<script setup lang="ts">
import DefaultLayout from "@/shared/ui/DefaultLayout.vue";
import Calendar from "@/entities/calendar/ui/CalendarMain.vue";
import ScheduleMonth from "@/entities/schedule/ui/ScheduleMonth.vue";
</script>

<template>
  <DefaultLayout>
    <template #main-content>
      <div class="type-two">
        <div class="type-fix w-80"><Calendar /></div>
        <div><ScheduleMonth /></div>
      </div>
    </template>
  </DefaultLayout>
</template>
