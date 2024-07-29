import { tanstackQueryClient } from "@/main"
import {
  CalendarCreateEvent,
  CalendaUpdateEvents,
} from "@/shared/api/gql/graphql"
import { prettifyTimestamp } from "@/shared/lib/date-utils"
import { useMutation } from "@tanstack/vue-query"
import { toast } from "vue-sonner"
import { eventService } from "./api"
import { removeManualEventById } from "../schedule/model"

export const useEventsModel = (eventId?: number) => {
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
          onClick: () => toast.info("Скоро будет доступно"),
        },
      })

      return tanstackQueryClient.invalidateQueries({ queryKey: ["calendar"] })
    },
  })

  const { mutate: deleteEventMutation, isPending: isPendingEventMutation } =
    useMutation({
      mutationKey: ["deleteEvent", eventId],
      meta: {
        context: "Удаление события",
      },

      mutationFn: (eventIds: number[]) =>
        eventService.mutations.deleteEvents(eventIds),

      onSuccess: (data) => {
        toast("Событие было удалено", {
          action: {
            label: "Отмена",
            onClick: () => toast.info("Скоро будет доступно"),
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
