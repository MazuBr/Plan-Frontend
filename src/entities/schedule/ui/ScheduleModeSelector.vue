<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectItem,
} from "@/shared/ui/design/ui/select";
import { useScheduleMode } from "../model";

const scheduleMode = useScheduleMode();
</script>

<template>
  <Select v-model:model-value="scheduleMode">
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Выбор режима расписания" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Расписание</SelectLabel>
        <SelectItem value="day"> День </SelectItem>
        <SelectItem value="week"> Неделя </SelectItem>
        <SelectItem value="month"> Месяц </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
