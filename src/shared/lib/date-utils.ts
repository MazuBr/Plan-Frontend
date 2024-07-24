const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  fractionalSecondDigits: 3,
  timeZone: "UTC",
} satisfies Intl.DateTimeFormatOptions;

export function prettifyTimestamp(timestamp: number | string) {
  return new Intl.DateTimeFormat("ru-RU", options).format(new Date(timestamp));
}

export function getHoursAndMinutes(timestamp: number | string) {
  const date = new Date(timestamp);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
