import { graphqlClient } from "@/shared/api/base";
import { GetCalendarMonthDocument } from "./GetCalendarMonth.query.generated";

export const scheduleService = {
  getters: {
    async getScheduleForMonth(epochStart: number, epochEnd: number) {
      const data = await graphqlClient.request(GetCalendarMonthDocument, {
        epochStart,
        epochEnd,
      });

      return data.calendar;
    },
  },

  mutations: {},
};
