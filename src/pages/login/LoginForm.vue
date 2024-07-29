<script setup lang="ts">
import { useSessionState } from "@/entities/user/model"
import { LoginRequest } from "@/shared/api/restApi"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/ui/design/ui/alert"
import { AnimatedText } from "@/shared/ui/design/ui/animated-text"
import { AutoForm } from "@/shared/ui/design/ui/auto-form"
import Button from "@/shared/ui/design/ui/button/Button.vue"
import { toTypedSchema } from "@vee-validate/zod"
import { GenericObject, useForm } from "vee-validate"
import { ref } from "vue"
import { z } from "zod"

const formSchema = z.object({
  identifier: z
    .string({ required_error: "Логин обязателен" })
    .describe("Логин или почта"),
  password: z
    .string({ required_error: "Пароль обязателен" })
    .describe("Пароль"),
})

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
})

const error = ref("")
const session = useSessionState()
async function onSubmit(values: GenericObject) {
  try {
    error.value = ""
    await session.login(values as LoginRequest)
  } catch (e) {
    error.value = (e as any)?.response?.data?.detail
  }
}
</script>

<template>
  <div class="space-y-3">
    <Alert v-if="error" variant="destructive">
      <AlertTitle>Ошибка</AlertTitle>
      <AlertDescription>
        {{ error }}
      </AlertDescription>
    </Alert>

    <AutoForm
      class="space-y-3"
      :form="form"
      :schema="formSchema"
      :field-config="{
        password: {
          inputProps: {
            type: 'password',
          },
        },
      }"
      :async-submit="onSubmit"
    >
      <Button :disabled="form.isSubmitting.value" type="submit">
        <AnimatedText
          text="Войти"
          active-text="Подождите"
          :active="form.isSubmitting.value"
        ></AnimatedText>
      </Button>
    </AutoForm>

    <div class="text-xs">
      Нет аккаунта?
      <router-link :to="{ name: 'register' }">
        <Button size="xs" variant="secondary">зарегистрируйся</Button>
      </router-link>
    </div>

    <div class="text-xs">
      <router-link :to="{ name: 'forgot-password' }">
        Забыли пароль?
      </router-link>
    </div>
  </div>
</template>
