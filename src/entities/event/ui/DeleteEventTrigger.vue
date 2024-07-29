<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/design/ui/popover"
import { Button } from "@/shared/ui/design"
import { AnimatedText } from "@/shared/ui/design/ui/animated-text"
import { useEventsModel } from "../model"

const props = defineProps<{ id: number }>()
const emits = defineEmits<{ success: [] }>()

const { deleteEventMutation, isPendingEventMutation } = useEventsModel(props.id)
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="destructive"
        :disabled="isPendingEventMutation"
        type="button"
      >
        <AnimatedText
          text="Удаление"
          active-text="Подождите"
          :active="isPendingEventMutation"
        ></AnimatedText>
      </Button>
    </PopoverTrigger>

    <PopoverContent>
      Вы уверены?
      <Button
        :disabled="isPendingEventMutation"
        class="text-error-1"
        variant="ghost"
        @click="
          deleteEventMutation([id], {
            onSuccess: () => emits('success'),
          })
        "
        >Да</Button
      >
    </PopoverContent>
  </Popover>
</template>
