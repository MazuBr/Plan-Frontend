<script setup lang="ts">
import { RepeatTypes } from "@/shared/api/gql/graphql"
import { getISOWeekNumber, getWeekDayByDate } from "@/shared/lib/date-utils"
import { AutoFormLabel, FieldProps } from "@/shared/ui/design/ui/auto-form"
import { beautifyObjectName } from "@/shared/ui/design/ui/auto-form/utils"
import { Label } from "@/shared/ui/design/ui/label"
import RadioGroup from "@/shared/ui/design/ui/radio-group/RadioGroup.vue"
import RadioGroupItem from "@/shared/ui/design/ui/radio-group/RadioGroupItem.vue"
import { useField, useFormValues } from "vee-validate"

const props = defineProps<
  FieldProps & {
    options?: string[]
  }
>()

const repeatTypes: RepeatTypes[] = [
  RepeatTypes.Daily,
  RepeatTypes.Weekly,
  RepeatTypes.Monthly,
  RepeatTypes.MonthlyByWeek,
  RepeatTypes.Yearly,
]

const fieldContext = useField<RepeatTypes>(props.fieldName)
const formValues = useFormValues()

function select(val: string) {
  if (!Object.values(RepeatTypes).includes(val as any)) return

  if (!fieldContext.value.value) {
    fieldContext.setValue(val as RepeatTypes)
    return
  }

  fieldContext.setValue(val as RepeatTypes)
}

function getMonthlyDescriptor() {
  return `Ежемесячно ${formValues.value.date.day} числа`
}

function getDeclinatedWeekday(weedDay: string) {
  switch (weedDay) {
    case "MONDAY":
    case "Понедельник":
    case "Пн":
      return "Понедельник"
    case "TUESDAY":
    case "Вторник":
    case "Вт":
      return "Вторник"
    case "THURSDAY":
    case "Четверг":
    case "Чт":
      return "Четверг"
    case "SUNDAY":
    case "Воскресенье":
    case "Вс":
      return "Воскресенье"

    case "WEDNESDAY":
    case "Среда":
    case "Ср":
      return "Среду"
    case "FRIDAY":
    case "Пятница":
    case "Пт":
      return "Пятницу"
    case "SATURDAY":
    case "Суббота":
    case "Сб":
      return "Субботу"

    default:
      return ""
  }
}

function getMonthlyByWeekDescriptor() {
  const date = formValues.value.date.toString()
  const weekDay = getWeekDayByDate(date, { full: true, translated: true })

  switch (weekDay) {
    case "WEDNESDAY":
    case "Среда":
    case "Ср":
    case "FRIDAY":
    case "Пятница":
    case "Пт":
    case "SATURDAY":
    case "Суббота":
    case "Сб":
      return `Ежемесячно каждую ${getISOWeekNumber(date)} ${getDeclinatedWeekday(weekDay)}`

    case "MONDAY":
    case "Понедельник":
    case "Пн":
    case "TUESDAY":
    case "Вторник":
    case "Вт":
    case "THURSDAY":
    case "Четверг":
    case "Чт":
      return `Ежемесячно каждый ${getISOWeekNumber(date)} ${getDeclinatedWeekday(weekDay)}`

    case "SUNDAY":
    case "Воскресенье":
    case "Вс":
      return `Ежемесячно каждое ${getISOWeekNumber(date)} ${getDeclinatedWeekday(weekDay)}`

    default:
      return ""
  }
}

function getTranslatedType(type: RepeatTypes) {
  const _dict: Record<RepeatTypes, string> = {
    DAILY: "Ежедневно",
    WEEKLY: "Еженедельно",
    MONTHLY: getMonthlyDescriptor(),
    MONTHLY_BY_WEEK: getMonthlyByWeekDescriptor(),
    YEARLY: "Ежегодно",
  }

  return _dict[type] || "..."
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <AutoFormLabel v-if="!config?.hideLabel" :required="required">
      {{ config?.label || beautifyObjectName(label ?? fieldName) }}
    </AutoFormLabel>

    <RadioGroup
      :model-value="fieldContext.value.value"
      @update:model-value="select"
    >
      <div v-for="type in repeatTypes" class="flex items-center space-x-2">
        <RadioGroupItem :id="type" :value="type" />
        <Label :for="type">{{ getTranslatedType(type) }}</Label>
      </div>
    </RadioGroup>
  </div>
</template>
