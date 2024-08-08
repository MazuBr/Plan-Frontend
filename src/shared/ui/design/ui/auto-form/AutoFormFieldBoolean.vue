<script setup lang="ts">
import { computed } from "vue"
import { beautifyObjectName } from "./utils"
import type { FieldProps } from "./interface"
import AutoFormLabel from "./AutoFormLabel.vue"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/design/ui/form"
import { Switch } from "@/shared/ui/design/ui/switch"
import { Checkbox } from "@/shared/ui/design/ui/checkbox"

const props = defineProps<FieldProps>()

const booleanComponent = computed(() =>
  props.config?.component === "switch" ? Switch : Checkbox
)
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem>
      <div class="space-y-0 mb-3 flex items-center gap-3">
        <FormControl>
          <slot v-bind="slotProps">
            <component
              :is="booleanComponent"
              v-bind="{ ...slotProps.componentField }"
              :disabled="disabled"
              :checked="slotProps.componentField.modelValue"
              @update:checked="slotProps.componentField['onUpdate:modelValue']"
            />
          </slot>
        </FormControl>
        <AutoFormLabel v-if="!config?.hideLabel" :required="required">
          {{ config?.label || beautifyObjectName(label ?? fieldName) }}
        </AutoFormLabel>
      </div>

      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <div v-if="$props.required" class="h-4">
        <FormMessage />
      </div>
    </FormItem>
  </FormField>
</template>
