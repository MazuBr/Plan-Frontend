<script setup lang="ts">
import { CalendarCreateEvent } from "@/shared/api/gql/graphql";
import { AnimatedText } from "@/shared/ui/design/ui/animated-text";
import { AutoForm } from "@/shared/ui/design/ui/auto-form";
import Button from "@/shared/ui/design/ui/button/Button.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { GenericObject, useForm } from "vee-validate";
import { z } from "zod";
import { eventService } from "../api";
import { DateValue } from "@internationalized/date";
import { toast } from "vue-sonner";
import { prettifyTimestamp } from "@/shared/lib/date-utils";
import { tanstackQueryClient } from "@/main";

const props = defineProps<{ initialDate?: DateValue }>();
const emits = defineEmits<{ success: [e: string] }>();

const formSchema = props.initialDate
  ? z.object({
      title: z
        .string()
        .min(1, { message: "Заголовок обязателен" })
        .describe("Название"),
      comment: z.string().describe("Описание"),
      date: z.coerce.date().default(props.initialDate as any),
      startTime: z.string().describe("Время начала"),
      endTime: z.string().describe("Время окончания"),
    })
  : z.object({
      title: z
        .string()
        .min(1, { message: "Заголовок обязателен" })
        .describe("Название"),
      comment: z.string().describe("Описание"),
      date: z.coerce.date().describe("Дата"),
      startTime: z.string().describe("Время начала"),
      endTime: z.string().describe("Время окончания"),
    });

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
});

async function onSubmit(values: GenericObject) {
  const cloneStartDate = structuredClone(values.date) as Date;
  const [startHour, startMinute] = values.startTime.split(":");
  cloneStartDate.setUTCHours(parseInt(startHour), parseInt(startMinute));
  const startTime = Math.floor(cloneStartDate.getTime() / 1000);

  const cloneEndDate = structuredClone(values.date) as Date;
  const [endHour, endMinute] = values.endTime.split(":");
  cloneEndDate.setUTCHours(parseInt(endHour), parseInt(endMinute));
  const endTime = Math.floor(cloneEndDate.getTime() / 1000);

  const payload: CalendarCreateEvent = {
    title: values.title,
    comment: values.comment,
    startTime: startTime,
    endTime: endTime,
  };

  const response = await eventService.mutations.createEvent(payload);
  await tanstackQueryClient.invalidateQueries({ queryKey: ["calendar"] });

  const toastMessage = `Событие «${payload.title}», даты ${prettifyTimestamp(
    startTime
  )} - ${prettifyTimestamp(endTime)}`;

  toast("Событие было создано", {
    description: toastMessage,
    action: {
      label: "Абоба",
      onClick: () => console.log("Абоба"),
    },
  });
  emits("success", response.createEvent.title);
}
</script>

<template>
  <AutoForm
    class="space-y-3"
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
    <Button :disabled="form.isSubmitting.value" type="submit">
      <AnimatedText
        text="Подтвердить"
        active-text="Подождите"
        :active="form.isSubmitting.value"
      ></AnimatedText>
    </Button>
  </AutoForm>
</template>
