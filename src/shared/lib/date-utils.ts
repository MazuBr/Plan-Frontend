import { CalendarDate } from "@internationalized/date"

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  fractionalSecondDigits: 3,
  timeZone: "UTC",
} satisfies Intl.DateTimeFormatOptions

export function isoToEpoch(iso?: string) {
  if (!iso) throw new Error("invalid iso")

  return Math.floor(new Date(iso).getTime() / 1000)
}

export function getISOWeekNumber(date: string) {
  const currentDate = new Date(date)

  const monthStartDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )

  const firstDayOfWeek = monthStartDate.getDay()

  const currentDay = currentDate.getDate()

  const weekNumber =
    Math.round((currentDay + firstDayOfWeek) / 7) +
    (firstDayOfWeek === 0 ? 1 : 0) // Кейс с 6 неделями на одной странице календаря

  return weekNumber
}

export function prettifyTimestamp(
  timestamp: number | string,
  optionsRewrite?: Partial<Intl.DateTimeFormatOptions>
) {
  return new Intl.DateTimeFormat("ru-RU", {
    ...options,
    ...optionsRewrite,
  }).format(new Date(timestamp))
}

export function getHoursAndMinutes(timestamp: number | string) {
  const date = new Date(timestamp)
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${hours}:${minutes}`
}

export function determineIfSameMonth(
  dateA: string | number,
  dateB: string | number
) {
  const dateObjA = new Date(dateA)
  const dateObjB = new Date(dateB)

  return (
    dateObjA.getFullYear() === dateObjB.getFullYear() &&
    dateObjA.getMonth() === dateObjB.getMonth()
  )
}

export function getDateValueByTimestamp(timestamp: string) {
  const year = new Date(timestamp).getFullYear()
  const month = new Date(timestamp).getMonth() + 1 // Months are zero-indexed
  const day = new Date(timestamp).getDate()
  return new CalendarDate(year, month, day)
}

export function getLocalStartTimeByTimestamp(timestamp: string | null) {
  if (!timestamp) return "00:00"

  const date = new Date(timestamp)
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${hours}:${minutes}`
}
