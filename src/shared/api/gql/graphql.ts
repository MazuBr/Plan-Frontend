/* eslint-disable */
// prettier-ignore
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  Date: { input: any; output: any }
  DateTime: { input: any; output: any }
}

export type CalendaDeleteEvents = {
  eventId: Array<Scalars["Int"]["input"]>
}

export type CalendaDeleteEventsResponse = {
  __typename?: "CalendaDeleteEventsResponse"
  ids: Array<Scalars["Int"]["output"]>
}

export type CalendaUpdateEvents = {
  comment?: InputMaybe<Scalars["String"]["input"]>
  endTime?: InputMaybe<Scalars["Int"]["input"]>
  eventId: Scalars["Int"]["input"]
  startTime?: InputMaybe<Scalars["Int"]["input"]>
  title?: InputMaybe<Scalars["String"]["input"]>
}

export type Calendar = {
  __typename?: "Calendar"
  comment?: Maybe<Scalars["String"]["output"]>
  endTime?: Maybe<Scalars["Int"]["output"]>
  id: Scalars["Int"]["output"]
  repeat: Repeat
  startTime: Scalars["Int"]["output"]
  title: Scalars["String"]["output"]
}

export type CalendarCreateEvent = {
  comment?: InputMaybe<Scalars["String"]["input"]>
  endTime?: InputMaybe<Scalars["Int"]["input"]>
  startTime: Scalars["Int"]["input"]
  title: Scalars["String"]["input"]
}

export type CalendarEventsByDay = {
  __typename?: "CalendarEventsByDay"
  day: Scalars["Date"]["output"]
  events: Array<CalendarHumanReadable>
}

export type CalendarGetEvents = {
  endTime: Scalars["Int"]["input"]
  startTime: Scalars["Int"]["input"]
}

export type CalendarHumanReadable = {
  __typename?: "CalendarHumanReadable"
  comment?: Maybe<Scalars["String"]["output"]>
  dayEventStart: Scalars["DateTime"]["output"]
  endTime?: Maybe<Scalars["DateTime"]["output"]>
  id: Scalars["Int"]["output"]
  repeat: Repeat
  title: Scalars["String"]["output"]
}

export type Mutation = {
  __typename?: "Mutation"
  createEvent: Calendar
  deleteEvent: CalendaDeleteEventsResponse
  updateEvent: UpdatedEvent
}

export type MutationCreateEventArgs = {
  input: CalendarCreateEvent
}

export type MutationDeleteEventArgs = {
  input: CalendaDeleteEvents
}

export type MutationUpdateEventArgs = {
  input: CalendaUpdateEvents
}

export type Query = {
  __typename?: "Query"
  calendar: Array<CalendarEventsByDay>
  calendarEpoch: Array<Calendar>
  roles: Array<Role>
}

export type QueryCalendarArgs = {
  input: CalendarGetEvents
}

export type QueryCalendarEpochArgs = {
  input: CalendarGetEvents
}

export type Repeat = {
  __typename?: "Repeat"
  isRepeat?: Maybe<Scalars["Boolean"]["output"]>
  repeatUntil?: Maybe<Scalars["String"]["output"]>
}

export type Role = {
  __typename?: "Role"
  id: Scalars["Int"]["output"]
  name: Scalars["String"]["output"]
}

export type UpdatedEvent = {
  __typename?: "UpdatedEvent"
  comment?: Maybe<Scalars["String"]["output"]>
  endTime?: Maybe<Scalars["Int"]["output"]>
  eventId: Scalars["Int"]["output"]
  startTime?: Maybe<Scalars["Int"]["output"]>
  title?: Maybe<Scalars["String"]["output"]>
}
