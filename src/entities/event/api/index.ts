import { graphqlClient } from "@/shared/api/base";
import { CalendarCreateEvent } from "@/shared/api/gql/graphql";
import { CreateEventDocument } from "./CreateEvent.mutation.generated";

export const eventService = {
  getters: {},

  mutations: {
    async createEvent(input: CalendarCreateEvent) {
      return await graphqlClient.request(CreateEventDocument, { event: input });
    },
  },
};
