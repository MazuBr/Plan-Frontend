<script setup lang="ts">
import AutoFormLabel from "./AutoFormLabel.vue"
import { beautifyObjectName } from "./utils"
import type { FieldProps } from "./interface"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/design/ui/form"
import { Input } from "@/shared/ui/design/ui/input"

defineOptions({
  inheritAttrs: false,
})

defineProps<FieldProps>()
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem>
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <Input
            type="number"
            v-bind="{ ...slotProps.componentField, ...config?.inputProps }"
            :disabled="disabled"
          />
        </slot>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <div v-if="$props.required" class="h-4">
        <FormMessage />
      </div>
    </FormItem>
  </FormField>
</template>
