import { DateRange } from "@/src/types/date-range";

export function getCurrentMonthRange(): DateRange {
  const now = new Date();

  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  return {
    startDate: start.toISOString(),
    endDate: now.toISOString(),
  };
}