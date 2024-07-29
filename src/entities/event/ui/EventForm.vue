<script setup lang="ts">
import {
  CalendarCreateEvent,
  CalendaUpdateEvents as CalendarUpdateEvents,
} from "@/shared/api/gql/graphql"
import { AnimatedText } from "@/shared/ui/design/ui/animated-text"
import { AutoForm } from "@/shared/ui/design/ui/auto-form"
import Button from "@/shared/ui/design/ui/button/Button.vue"
import { toTypedSchema } from "@vee-validate/zod"
import { GenericObject, useForm } from "vee-validate"
import { z } from "zod"
import { DateValue } from "@internationalized/date"
import {
  getDateValueByTimestamp,
  getLocalStartTimeByTimestamp,
} from "@/shared/lib/date-utils"
import { CalendarData } from "@/entities/schedule/api"
import DeleteEventTrigger from "./DeleteEventTrigger.vue"
import { useIsMutating } from "@tanstack/vue-query"
import { computed, onMounted } from "vue"
import { useEventsModel } from "../model"

const props = defineProps<{
  initialDate?: DateValue
  eventData?: CalendarData["events"][number]
}>()

const emits = defineEmits<{ success: [e: string] }>()

const formSchema = !props.eventData
  ? z.object({
      title: z
        .string({ required_error: "Название обязательно" })
        .min(1, { message: "Заголовок обязателен" })
        .describe("Название"),
      comment: z.string().describe("Описание").optional(),
      date: z.coerce
        .date({ required_error: "Дата обязательна" })
        .default(props.initialDate as any),
      startTime: z
        .string({ required_error: "Время обязательно" })
        .describe("Время начала"),
      endTime: z
        .string({ required_error: "Время обязательно" })
        .describe("Время окончания"),
    })
  : z.object({
      title: z
        .string({ required_error: "Название обязательно" })
        .min(1, { message: "Заголовок обязателен" })
        .describe("Название")
        .default(props.eventData.title),
      comment: z
        .string()
        .describe("Описание")
        .optional()
        .default(props.eventData.comment || ""),
      date: z.coerce
        .date({ required_error: "Дата обязательна" })
        .default(
          getDateValueByTimestamp(props.eventData?.dayEventStart) as any
        ),
      startTime: z
        .string({ required_error: "Время обязательно" })
        .describe("Время начала"),
      endTime: z
        .string({ required_error: "Время обязательно" })
        .describe("Время окончания"),
    })

onMounted(() => {
  if (!props.eventData) return
  form.setValues({
    startTime: getLocalStartTimeByTimestamp(props.eventData.dayEventStart),
    endTime: getLocalStartTimeByTimestamp(props.eventData.endTime),
  })
})

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
})

const { asyncCreateEventMutation, asyncUpdateEventMutation } = useEventsModel(
  props.eventData?.id
)

async function onSubmit(values: GenericObject) {
  const cloneStartDate = structuredClone(values.date) as Date
  const [startHour, startMinute] = values.startTime.split(":")
  cloneStartDate.setHours(parseInt(startHour), parseInt(startMinute))
  const startTime = Math.floor(cloneStartDate.getTime() / 1000)

  const cloneEndDate = structuredClone(values.date) as Date
  const [endHour, endMinute] = values.endTime.split(":")
  cloneEndDate.setHours(parseInt(endHour), parseInt(endMinute))
  const endTime = Math.floor(cloneEndDate.getTime() / 1000)

  const createPayload: CalendarCreateEvent = {
    title: values.title,
    comment: values.comment,
    startTime: startTime,
    endTime: endTime,
  }

  if (!props.eventData) {
    await asyncCreateEventMutation(createPayload, {
      onSuccess: () => emits("success", createPayload.title),
    })
    return
  }

  const updatePayload: CalendarUpdateEvents = {
    eventId: props.eventData.id,
    title: values.title,
    comment: values.comment,
    startTime: startTime,
    endTime: endTime,
  }
  await asyncUpdateEventMutation(updatePayload, {
    onSuccess: () => emits("success", updatePayload.title || ""),
  })
}

const isDeletingEvent = useIsMutating({
  mutationKey: ["deleteEvent", props.eventData?.id],
})

const isPerformingAction = computed(() => {
  return !!isDeletingEvent.value || form.isSubmitting.value
})
</script>

<template>
  <AutoForm
    class="space-y-3"
    :class="isPerformingAction ? 'opacity-50' : 'opacity-100'"
    :inert="!!isPerformingAction"
    :form="form"
    :schema="formSchema"
    :field-config="{
      date: {
        label: 'Дата',
        disabled: !!props.initialDate,
      } as any,
      startTime: {
        inputProps: {
          type: 'time',
        },
      },
      endTime: {
        inputProps: {
          type: 'time',
        },
      },
    }"
    :async-submit="onSubmit"
  >
    <div class="flex gap-3">
      <Button :disabled="form.isSubmitting.value" type="submit">
        <AnimatedText
          text="Подтвердить"
          active-text="Подождите"
          :active="form.isSubmitting.value"
        ></AnimatedText>
      </Button>

      <DeleteEventTrigger
        v-if="eventData"
        :id="eventData.id"
        @success="$emit('success', '')"
      />
    </div>
  </AutoForm>
</template>
