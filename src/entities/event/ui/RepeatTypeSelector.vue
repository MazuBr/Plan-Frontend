<script setup lang="ts">
import { RepeatTypes } from "@/shared/api/gql/graphql"
import { getISOWeekNumber, getWeekDayByDate } from "@/shared/lib/date-utils"
import {
  AutoFormLabel,
  Config,
  FieldProps,
} from "@/shared/ui/design/ui/auto-form"
import { beautifyObjectName } from "@/shared/ui/design/ui/auto-form/utils"
import Button from "@/shared/ui/design/ui/button/Button.vue"
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

function getMonthlyByWeekDescriptor() {
  const date = formValues.value.date.toString()
  return `Ежемесячно каждый ${getISOWeekNumber(date)} ${getWeekDayByDate(date, { full: true, translated: true })}`
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
