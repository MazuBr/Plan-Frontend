<script setup lang="ts">
import {
  AutoFormLabel,
  Config,
  FieldProps,
} from "@/shared/ui/design/ui/auto-form"
import { beautifyObjectName } from "@/shared/ui/design/ui/auto-form/utils"
import Button from "@/shared/ui/design/ui/button/Button.vue"
import { useField } from "vee-validate"

const props = defineProps<
  FieldProps & {
    options?: string[]
  }
>()

type Days = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"
const daysOfWeek: Days[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]

const fieldContext = useField<Days[]>(props.fieldName)

function select(val: Days) {
  if (!fieldContext.value.value) {
    fieldContext.setValue([val])
    return
  }

  if (fieldContext.value.value.includes(val)) {
    fieldContext.setValue(fieldContext.value.value.filter((v) => v !== val))
    return
  }

  fieldContext.setValue(fieldContext.value.value.concat(val))
}

function isSelected(val: Days) {
  if (!fieldContext.value.value) return false

  return fieldContext.value.value.includes(val)
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <AutoFormLabel v-if="!config?.hideLabel" :required="required">
      {{ config?.label || beautifyObjectName(label ?? fieldName) }}
    </AutoFormLabel>

    <div class="flex gap-3">
      <Button
        v-for="day in daysOfWeek"
        :key="day"
        type="button"
        :variant="isSelected(day) ? 'default' : 'outline'"
        size="icon"
        @click="select(day)"
        >{{ day }}</Button
      >
    </div>
  </div>
</template>
