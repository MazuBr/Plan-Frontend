import { tanstackQueryClient } from "@/main"
import {
  CalendarCreateEvent,
  CalendaUpdateEvents,
} from "@/shared/api/gql/graphql"
import { isoToEpoch, prettifyTimestamp } from "@/shared/lib/date-utils"
import { useMutation } from "@tanstack/vue-query"
import { toast } from "vue-sonner"
import { eventService } from "./api"
import { removeManualEventById } from "../schedule/model"
import { CalendarData } from "../schedule/api"

export const useEventsModel = (event?: CalendarData["events"][number]) => {
  const { mutateAsync: asyncCreateEventMutation } = useMutation({
    meta: {
      context: "Создание события",
    },

    mutationFn: (payload: CalendarCreateEvent) =>
      eventService.mutations.createEvent(payload),
    onSuccess(data, variables) {
      console.log(data, variables)
      const toastMessage = `Событие «${variables.title}», даты ${prettifyTimestamp(
        variables.startTime
      )} - ${prettifyTimestamp(variables.endTime || Date.now())}`

      toast("Событие было создано", {
        description: toastMessage,
        action: {
          label: "Отмена",
          onClick: () =>
            eventService.mutations
              .deleteEvents([data.createEvent.id])
              .then((r) => {
                toast.success(
                  `Событие ${data.createEvent.title} успешно отменено`
                )
                removeManualEventById(r.deleteEvent.ids[0])
                tanstackQueryClient.invalidateQueries({
                  queryKey: ["calendar"],
                })
              }),
        },
      })

      return tanstackQueryClient.invalidateQueries({ queryKey: ["calendar"] })
    },
  })

  const { mutateAsync: asyncUpdateEventMutation } = useMutation({
    meta: {
      context: "Обновление события",
    },

    mutationFn: (payload: CalendaUpdateEvents) =>
      eventService.mutations.updateEvent(payload),
    onSuccess(data, variables) {
      console.log(data, variables)
      const toastMessage = `Событие «${variables.title}», даты ${prettifyTimestamp(
        variables.startTime || Date.now()
      )} - ${prettifyTimestamp(variables.endTime || Date.now())}`

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
                .createEvent({
                  title: event?.title || "",
                  comment: event?.comment,
                  startTime: isoToEpoch(event?.dayEventStart),
                  endTime: isoToEpoch(event?.endTime),
                })
                .then((r) => {
                  toast.success(
                    `Событие ${r.createEvent.title} успешно восстановлено`
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
