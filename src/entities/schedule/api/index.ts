import { graphqlClient } from "@/shared/api/base"
import {
  GetCalendarMonthDocument,
  GetCalendarMonthQuery,
} from "./GetCalendarMonth.query.generated"

import { DeepExtractTypeSkipArrays } from "ts-deep-extract-types"

export type CalendarData = DeepExtractTypeSkipArrays<
  GetCalendarMonthQuery,
  ["calendar"]
>

export const scheduleService = {
  getters: {
    async getScheduleForMonth(
      epochStart: number,
      epochEnd: number,
      tz: string
    ) {
      const data = await graphqlClient.request(GetCalendarMonthDocument, {
        epochStart,
        epochEnd,
        tz,
      })

      return data.calendar
    },
  },

  mutations: {},
}
