import { graphqlClient } from "@/shared/api/base"
import {
  CalendarCreateEvent,
  CalendaUpdateEvents,
} from "@/shared/api/gql/graphql"
import { CreateEventDocument } from "./CreateEvent.mutation.generated"
import { DeleteEventsDocument } from "./DeleteEvents.mutation.generated"
import { UpdateEventDocument } from "./UpdateEvent.mutation.generated"
import { RestoreEventsDocument } from "./RestoreEvents.mutation.generated"

export const eventService = {
  getters: {},

  mutations: {
    async createEvent(input: CalendarCreateEvent) {
      return await graphqlClient.request(CreateEventDocument, { event: input })
    },

    async updateEvent(input: CalendaUpdateEvents) {
      return await graphqlClient.request(UpdateEventDocument, { input })
    },

    async restoreEvents(eventIds: number[]) {
      return await graphqlClient.request(RestoreEventsDocument, { eventIds })
    },

    async deleteEvents(eventIds: number[]) {
      return await graphqlClient.request(DeleteEventsDocument, {
        ids: eventIds,
      })
    },
  },
}
