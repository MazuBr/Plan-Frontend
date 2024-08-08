<script setup lang="ts">
import {
  Dialog,
  DialogHeader,
  DialogScrollContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/design/ui/dialog"
import EventForm from "./EventForm.vue"
import { ref } from "vue"
import { CalendarData } from "@/entities/schedule/api"

defineProps<{ eventData: CalendarData["events"][number] }>()

const isOpened = ref(false)
</script>

<template>
  <Dialog v-model:open="isOpened">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogScrollContent>
      <DialogHeader>
        <DialogTitle>Редактирование события</DialogTitle>
      </DialogHeader>

      <EventForm :event-data="eventData" @success="isOpened = false" />
    </DialogScrollContent>
  </Dialog>
</template>
