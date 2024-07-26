import { useLocalStorage } from "@vueuse/core";
import { useRouteParams } from "@vueuse/router";

export type ScheduleMode = "day" | "week" | "month";

export const useScheduleMode = () => {
  return useRouteParams<ScheduleMode>(
    "mode",
    useLocalStorage<ScheduleMode>("scheduleMode", "month")
  );
};
