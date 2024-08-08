import { tanstackQueryClient } from "@/main"
import {
  CalendarCreateEvent,
  CalendarUpdateEvents,
  InputMaybe,
  InputRepeat,
  RepeatTypes,
} from "@/shared/api/gql/graphql"
import {
  getISOWeekNumber,
  getWeekDayByDate,
  isoToEpoch,
  prettifyTimestamp,
} from "@/shared/lib/date-utils"
import { useMutation } from "@tanstack/vue-query"
import { toast } from "vue-sonner"
import { eventService } from "./api"
import { removeManualEventById } from "../schedule/model"
import { CalendarData } from "../schedule/api"
import { parseDate } from "@internationalized/date"

export enum DaysOfWeek {
  Friday = "FRIDAY",
  Monday = "MONDAY",
  Saturday = "SATURDAY",
  Sunday = "SUNDAY",
  Thursday = "THURSDAY",
  Tuesday = "TUESDAY",
  Wednesday = "WEDNESDAY",
}

export const daysOfWeek: DaysOfWeek[] = [
  DaysOfWeek.Monday,
  DaysOfWeek.Tuesday,
  DaysOfWeek.Wednesday,
  DaysOfWeek.Thursday,
  DaysOfWeek.Friday,
  DaysOfWeek.Saturday,
  DaysOfWeek.Sunday,
]

export const REPEAT_DEFAULTS = {
  DELAY: 1,
  REPEAT_TYPE: RepeatTypes.Daily,
  WEEK_DAYS: [],

  get REPEAT_UNTIL() {
    return parseDate(new Date().toISOString().slice(0, 10)).add({
      years: 1,
    }) as unknown as Date
  },
}

export function getRepeatConfig(
  repeat: CalendarData["events"][number]["repeat"]
) {
  return {
    delay: repeat.delay || REPEAT_DEFAULTS.DELAY,
    repeatType: repeat.repeatType || REPEAT_DEFAULTS.REPEAT_TYPE,
    repeatUntil:
      parseRepeatUntil(repeat.repeatUntil) || REPEAT_DEFAULTS.REPEAT_UNTIL,
    weekDays: tryParseWeekdays(repeat.repeatData) || REPEAT_DEFAULTS.WEEK_DAYS,
  }
}

function parseRepeatUntil(repeatUntil?: string | null) {
  if (!repeatUntil) return REPEAT_DEFAULTS.REPEAT_UNTIL

  return parseDate(
    new Date(parseInt(repeatUntil) * 1000).toISOString().slice(0, 10)
  ) as never as Date
}

function tryParseWeekdays(repeatData?: string | null) {
  if (!repeatData) return REPEAT_DEFAULTS.WEEK_DAYS

  try {
    const parsedRepeatData: {
      weekly: {
        daysOfWeek: DaysOfWeek[]
      }
    } = JSON.parse(repeatData)

    return parsedRepeatData.weekly.daysOfWeek
  } catch (e) {
    return REPEAT_DEFAULTS.WEEK_DAYS
  }
}

function eventRepeatToInputRepeat(
  eventRepeat: CalendarData["events"][number]["repeat"]
): CalendarUpdateEvents["repeat"] {
  return {
    repeatType: eventRepeat.repeatType || REPEAT_DEFAULTS.REPEAT_TYPE,
    delay: eventRepeat.delay || REPEAT_DEFAULTS.DELAY,
    repeatUntil: parseInt(
      eventRepeat.repeatUntil ||
        isoToEpoch(REPEAT_DEFAULTS.REPEAT_UNTIL.toString()).toString()
    ),
    repeatData: eventRepeat.repeatData,
  }
}

export function getRepeatInput(values: {
  title?: string
  startTime?: string
  endTime?: string
  comment?: string | undefined
  date?: Date | undefined
  repeatConfig?:
    | {
        repeatType: RepeatTypes
        weekDays: DaysOfWeek[]
        delay: number
        repeatUntil: Date
      }
    | undefined
}): InputMaybe<InputRepeat> | undefined {
  return {
    delay: values.repeatConfig?.delay,
    repeatUntil: isoToEpoch(values.repeatConfig!.repeatUntil.toString()),
    repeatType: values.repeatConfig!.repeatType,
    repeatData: JSON.stringify({
      monthlyByWeek:
        values.repeatConfig?.repeatType === RepeatTypes.MonthlyByWeek
          ? {
              daysOfWeek: getWeekDayByDate(values.date!.toString()),
              week: getISOWeekNumber(values.date!.toString()),
            }
          : undefined,
      weekly:
        values.repeatConfig?.repeatType === RepeatTypes.Weekly
          ? { daysOfWeek: values.repeatConfig.weekDays }
          : undefined,
    }),
  }
}

export const useEventsModel = (event?: CalendarData["events"][number]) => {
  const { mutateAsync: asyncCreateEventMutation } = useMutation({
    meta: {
      context: "Создание события",
    },

    mutationFn: (payload: CalendarCreateEvent) =>
      eventService.mutations.createEvent(payload),
    onSuccess(data, variables) {
      const toastMessage = `Событие «${variables.title}», даты ${prettifyTimestamp(
        variables.startTime * 1000
      )} - ${prettifyTimestamp((variables.endTime || Date.now()) * 1000)}`

      toast("Событие было создано", {
        description: toastMessage,
        action: data.createEvent?.id
          ? {
              label: "Отмена",
              onClick: () =>
                eventService.mutations
                  .deleteEvents([data.createEvent!.id])
                  .then((r) => {
                    toast.success(
                      `Событие ${data.createEvent!.title} успешно отменено`
                    )
                    removeManualEventById(r.deleteEvent.ids[0])
                    tanstackQueryClient.invalidateQueries({
                      queryKey: ["calendar"],
                    })
                  }),
            }
          : undefined,
      })

      return tanstackQueryClient.invalidateQueries({ queryKey: ["calendar"] })
    },
  })

  const { mutateAsync: asyncUpdateEventMutation } = useMutation({
    meta: {
      context: "Обновление события",
    },

    mutationFn: (payload: CalendarUpdateEvents) =>
      eventService.mutations.updateEvent(payload),
    onSuccess(data, variables) {
      const toastMessage = `Событие «${variables.title}», даты ${prettifyTimestamp(
        (variables.startTime || Date.now()) * 1000
      )} - ${prettifyTimestamp((variables.endTime || Date.now()) * 1000)}`

      toast("Событие было обновлено", {
        description: toastMessage,
        action: {
          label: "Отмена",
          onClick: () =>
            eventService.mutations
              .updateEvent({
                eventId: event?.id || 0,
                comment: event?.comment,
                endTime: isoToEpoch(event?.endTime),
                startTime: isoToEpoch(event?.dayEventStart),
                title: event?.title,
                repeat: event?.repeat
                  ? eventRepeatToInputRepeat(event.repeat)
                  : undefined,
              })
              .then((r) => {
                toast.success(
                  `Событие ${r.updateEvent.title} успешно восстановлено`
                )
                tanstackQueryClient.invalidateQueries({
                  queryKey: ["calendar"],
                })
              }),
        },
      })

      return tanstackQueryClient.invalidateQueries({ queryKey: ["calendar"] })
    },
  })

  const { mutate: deleteEventMutation, isPending: isPendingEventMutation } =
    useMutation({
      mutationKey: ["deleteEvent", event?.id],
      meta: {
        context: "Удаление события",
      },

      mutationFn: (eventIds: number[]) =>
        eventService.mutations.deleteEvents(eventIds),

      onSuccess: (data) => {
        toast("Событие было удалено", {
          action: {
            label: "Отмена",
            onClick: () =>
              eventService.mutations
                .restoreEvents(data.deleteEvent.ids)
                .then((r) => {
                  toast.success(
                    `Событие ${r.restoreEvent[0].title} успешно восстановлено`
                  )
                  tanstackQueryClient.invalidateQueries({
                    queryKey: ["calendar"],
                  })
                }),
          },
        })

        removeManualEventById(data.deleteEvent.ids[0])

        return tanstackQueryClient.invalidateQueries({ queryKey: ["calendar"] })
      },
    })

  return {
    asyncCreateEventMutation,
    asyncUpdateEventMutation,
    deleteEventMutation,
    isPendingEventMutation,
  }
}
