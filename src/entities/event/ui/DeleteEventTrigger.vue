<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query"
import { eventService } from "../api"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/design/ui/popover"
import { Button } from "@/shared/ui/design"
import { AnimatedText } from "@/shared/ui/design/ui/animated-text"
import { tanstackQueryClient } from "@/main"

const props = defineProps<{ id: number }>()
const emits = defineEmits<{ success: [] }>()

const { mutate, isPending } = useMutation({
  mutationKey: ["deleteEvent", props.id],

  mutationFn: (eventIds: number[]) =>
    eventService.mutations.deleteEvents(eventIds),

  onSuccess: () => {
    emits("success")
    return tanstackQueryClient.invalidateQueries({ queryKey: ["calendar"] })
  },
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="destructive" :disabled="isPending" type="button">
        <AnimatedText
          text="Удаление"
          active-text="Подождите"
          :active="isPending"
        ></AnimatedText>
      </Button>
    </PopoverTrigger>

    <PopoverContent>
      Вы уверены?
      <Button
        :disabled="isPending"
        class="text-error-1"
        variant="ghost"
        @click="mutate([id])"
        >Да</Button
      >
    </PopoverContent>
  </Popover>
</template>
