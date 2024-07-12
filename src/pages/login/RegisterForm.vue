<script setup lang="ts">
import { useSessionState } from "@/entities/user/model";
import { UserCreate } from "@/shared/api/restApi";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/ui/design/ui/alert";
import AnimatedText from "@/shared/ui/design/ui/animated-text/AnimatedText.vue";
import { AutoForm } from "@/shared/ui/design/ui/auto-form";
import Button from "@/shared/ui/design/ui/button/Button.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { GenericObject, useForm } from "vee-validate";
import { ref } from "vue";
import { z } from "zod";

const formSchema = z
  .object({
    username: z
      .string({ required_error: "Логин обязателен" })
      .max(50, { message: "Максимальная длина 50 символов" })
      .describe("Логин"),
    email: z
      .string({ required_error: "Почта обязательна" })
      .email({ message: "Неправильный формат" })
      .describe("Электронная почта"),
    password: z
      .string({ required_error: "Пароль обязателен" })
      .describe("Пароль"),
    confirm: z
      .string({ required_error: "Пароль обязателен" })
      .describe("Подтвердите пароль"),
    first_name: z.string().describe("Имя").optional(),
    last_name: z.string().describe("Фамилия").optional(),
    phone: z.string().describe("Телефон").optional(),
    address: z.string().describe("Адрес").optional(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Пароли должны совпадать",
    path: ["confirm"],
  });

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
});

const error = ref("");
const session = useSessionState();
async function onSubmit(values: GenericObject) {
  try {
    error.value = "";
    await session.register(values as UserCreate);
  } catch (e) {
    const errDetails = (e as any)?.response?.data?.detail;
    if (!errDetails) return;

    let errorBag: GenericObject = {};
    for (const key in errDetails) {
      if (Object.prototype.hasOwnProperty.call(form.values, key)) {
        const element = errDetails[key];
        errorBag[key] = element;
      }
    }

    if (Object.keys(errorBag).length) {
      form.setErrors(errorBag);
    } else {
      error.value = errDetails;
    }
  }
}
</script>

<template>
  <div class="text-lg mb-3">Регистрация</div>

  <Alert v-if="error" variant="destructive">
    <AlertTitle>Ошибка</AlertTitle>
    <AlertDescription class="overflow-auto">
      <pre
        >{{ error }}
      </pre>
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
      confirm: {
        inputProps: {
          type: 'password',
        },
      },
    }"
    @submit="onSubmit"
  >
    <Button :disabled="form.isSubmitting.value" type="submit">
      <AnimatedText
        text="Подтвердить"
        active-text="Подождите"
        :active="form.isSubmitting.value"
      ></AnimatedText>
    </Button>
  </AutoForm>
</template>
