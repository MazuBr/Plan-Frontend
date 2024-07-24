<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/design/ui/dialog";
import EventForm from "./EventForm.vue";
import { ref } from "vue";
import { DateValue } from "@internationalized/date";

defineProps<{ initialDate?: DateValue }>();

const isOpened = ref(false);
</script>

<template>
  <Dialog v-model:open="isOpened">
    <DialogTrigger as-child>
      <slot name="trigger" /> {{ isOpened }}
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Создание события</DialogTitle>
        <DialogDescription> Сюдым тыдым и оно готово </DialogDescription>
      </DialogHeader>

      <EventForm :initial-date="initialDate" @success="isOpened = false" />
    </DialogContent>
  </Dialog>
</template>
