<script setup lang="ts">
import {
  CalendarCreateEvent,
  CalendarUpdateEvents,
  EventStatus,
  RepeatTypes,
} from "@/shared/api/gql/graphql"
import { AnimatedText } from "@/shared/ui/design/ui/animated-text"
import { AutoForm } from "@/shared/ui/design/ui/auto-form"
import Button from "@/shared/ui/design/ui/button/Button.vue"
import { toTypedSchema } from "@vee-validate/zod"
import { GenericObject, useForm } from "vee-validate"
import { z } from "zod"
import { DateValue, parseDate } from "@internationalized/date"
import {
  getLocalStartTimeByTimestamp,
  isoToEpoch,
} from "@/shared/lib/date-utils"
import { CalendarData } from "@/entities/schedule/api"
import DeleteEventTrigger from "./DeleteEventTrigger.vue"
import { useIsMutating } from "@tanstack/vue-query"
import { computed, onMounted } from "vue"
import {
  DaysOfWeek,
  determineDelayLabel,
  getRepeatConfig,
  getRepeatInput,
  REPEAT_DEFAULTS,
  useEventsModel,
} from "../model"
import WeekDaySelector from "./WeekDaySelector.vue"
import { DependencyType } from "@/shared/ui/design/ui/auto-form/interface"
import RepeatTypeSelector from "./RepeatTypeSelector.vue"

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
      date: z.coerce.date({ required_error: "Дата обязательна" }),
      startTime: z
        .string({ required_error: "Время обязательно" })
        .describe("Время начала"),
      endTime: z
        .string({ required_error: "Время обязательно" })
        .describe("Время окончания"),
      isRepeated: z.boolean().optional(),
      repeatConfig: z
        .object({
          repeatType: z.nativeEnum(RepeatTypes),
          weekDays: z
            .array(z.nativeEnum(DaysOfWeek))
            .nonempty({ message: "Укажите как минимум 1 день" }),
          delay: z
            .number({
              invalid_type_error: "Введите целое число",
              required_error: "Периодичность обязательна",
            })
            .positive({ message: "Введите положительное целое число" })
            .int({ message: "Введите положительное целое число" }),
          repeatUntil: z.coerce.date(),
        })
        .describe("Настройка повторения")
        .optional(),
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
      date: z.coerce.date({ required_error: "Дата обязательна" }),
      startTime: z
        .string({ required_error: "Время обязательно" })
        .describe("Время начала"),
      endTime: z
        .string({ required_error: "Время обязательно" })
        .describe("Время окончания"),
      isRepeated: z.boolean().default(!!props.eventData.repeat).optional(),
      repeatConfig: z
        .object({
          repeatType: z.nativeEnum(RepeatTypes),
          weekDays: z
            .array(z.nativeEnum(DaysOfWeek))
            .nonempty({ message: "Укажите как минимум 1 день" }),
          delay: z
            .number({
              invalid_type_error: "Введите целое число",
              required_error: "Периодичность обязательна",
            })
            .positive({ message: "Введите положительное целое число" })
            .int({ message: "Введите положительное целое число" }),
          repeatUntil: z.coerce.date(),
        })
        .describe("Настройка повторения")
        .optional(),
    })

onMounted(() => {
  if (!props.eventData) {
    form.resetForm({
      values: {
        date: props.initialDate
          ? (parseDate(props.initialDate?.toString()) as never as Date)
          : undefined,
        repeatConfig: {
          delay: REPEAT_DEFAULTS.DELAY,
          repeatType: REPEAT_DEFAULTS.REPEAT_TYPE,
          weekDays: REPEAT_DEFAULTS.getRelativeDefaultWeekDays(
            props.initialDate?.toString()
          ),
          repeatUntil: REPEAT_DEFAULTS.getRelativeDefaultRepeatUntil(
            props.initialDate?.toString()
          ),
        },
      },
    })
    return
  }
  form.setValues({
    date: parseDate(props.eventData.endTime.slice(0, 10)) as never as Date,
    startTime: getLocalStartTimeByTimestamp(props.eventData.dayEventStart),
    endTime: getLocalStartTimeByTimestamp(props.eventData.endTime),
    isRepeated: !!props.eventData.repeat,
    repeatConfig: getRepeatConfig(props.eventData.repeat),
  })
})

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
  keepValuesOnUnmount: true,
})

const { asyncCreateEventMutation, asyncUpdateEventMutation } = useEventsModel(
  props.eventData
)

async function onSubmit(values: GenericObject) {
  const cloneStartDate = structuredClone(values.date) as Date
  const [startHour, startMinute] = values.startTime.split(":")
  cloneStartDate.setHours(parseInt(startHour), parseInt(startMinute))
  const startTime = isoToEpoch(cloneStartDate.toISOString())

  const cloneEndDate = structuredClone(values.date) as Date
  const [endHour, endMinute] = values.endTime.split(":")
  cloneEndDate.setHours(parseInt(endHour), parseInt(endMinute))
  const endTime = isoToEpoch(cloneEndDate.toISOString())

  const createPayload: CalendarCreateEvent = {
    title: values.title,
    comment: values.comment,
    startTime: startTime,
    endTime: endTime,
    repeat: values.isRepeated ? getRepeatInput(values as any) : null,
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
    repeat: values.isRepeated ? getRepeatInput(values as any) : null,
    eventStatus: EventStatus.Active,
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

const computedDelayLabel = computed(() => {
  return determineDelayLabel(
    form.values.repeatConfig?.delay,
    form.values.repeatConfig?.repeatType
  )
})
</script>

<template>
  <AutoForm
    class="space-y-3"
    :class="isPerformingAction ? 'opacity-50' : 'opacity-100'"
    :inert="!!isPerformingAction"
    :form="form"
    :schema="formSchema"
    :dependencies="[
      {
        sourceField: 'repeatConfig.repeatType',
        type: DependencyType.HIDES,
        targetField: 'repeatConfig.weekDays',
        when: (type: RepeatTypes) => !type || type !== RepeatTypes.Weekly,
      } as any,
      {
        sourceField: 'isRepeated',
        type: DependencyType.HIDES,
        targetField: 'repeatConfig',
        when: (r: boolean) => !r,
      } as any,
    ]"
    :field-config="{
      repeatConfig: {
        repeatType: {
          component: RepeatTypeSelector,
          label: 'Тип повторения',
        },
        weekDays: {
          component: WeekDaySelector,
          label: 'Дни недели',
        },
        delay: {
          label: computedDelayLabel,
        },
        repeatUntil: {
          label: 'Повторять до',
        },
      } as any,
      isRepeated: {
        label: 'Сделать повторяющимся?',
      },
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
        :event="eventData"
        @success="$emit('success', '')"
      />
    </div>
  </AutoForm>
</template>
