// prettier-ignore
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Calendar = {
  __typename?: 'Calendar';
  comment?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['Int']['output']>;
  eventStatus: EventStatus;
  id: Scalars['Int']['output'];
  repeat: Repeat;
  startTime: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  userData: EventUserRole;
};

export type CalendarCreateEvent = {
  comment?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['Int']['input']>;
  repeat?: InputMaybe<InputRepeat>;
  startTime: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CalendarDeleteEvents = {
  eventId: Array<Scalars['Int']['input']>;
};

export type CalendarDeleteEventsResponse = {
  __typename?: 'CalendarDeleteEventsResponse';
  ids: Array<Scalars['Int']['output']>;
};

export type CalendarEventsByDay = {
  __typename?: 'CalendarEventsByDay';
  day: Scalars['Date']['output'];
  events: Array<CalendarHumanReadable>;
};

export type CalendarGetEvents = {
  endTime: Scalars['Int']['input'];
  startTime: Scalars['Int']['input'];
  timeZone: Scalars['String']['input'];
};

export type CalendarHumanReadable = {
  __typename?: 'CalendarHumanReadable';
  comment?: Maybe<Scalars['String']['output']>;
  dayEventStart: Scalars['DateTime']['output'];
  endTime?: Maybe<Scalars['DateTime']['output']>;
  eventStatus: EventStatus;
  id: Scalars['Int']['output'];
  repeat?: Maybe<Repeat>;
  title: Scalars['String']['output'];
};

export type CalendarRestoreEvents = {
  eventId: Array<Scalars['Int']['input']>;
};

export type CalendarUpdateEvents = {
  comment?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['Int']['input']>;
  eventId: Scalars['Int']['input'];
  eventStatus?: InputMaybe<EventStatus>;
  repeat?: InputMaybe<InputRepeat>;
  startTime?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum EventStatus {
  Active = 'ACTIVE',
  Cancel = 'CANCEL',
  Pending = 'PENDING'
}

export type EventUserRole = {
  __typename?: 'EventUserRole';
  userId: Scalars['Int']['output'];
  userRole: Scalars['String']['output'];
};

export type InputRepeat = {
  delay?: InputMaybe<Scalars['Int']['input']>;
  repeatData?: InputMaybe<Scalars['String']['input']>;
  repeatType: RepeatTypes;
  repeatUntil?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent?: Maybe<Calendar>;
  deleteEvent: CalendarDeleteEventsResponse;
  restoreEvent: Array<UpdatedEvent>;
  updateEvent: UpdatedEvent;
};


export type MutationCreateEventArgs = {
  input: CalendarCreateEvent;
};


export type MutationDeleteEventArgs = {
  input: CalendarDeleteEvents;
};


export type MutationRestoreEventArgs = {
  input: CalendarRestoreEvents;
};


export type MutationUpdateEventArgs = {
  input: CalendarUpdateEvents;
};

export type Query = {
  __typename?: 'Query';
  calendar: Array<CalendarEventsByDay>;
  calendarEpoch: Array<Calendar>;
  roles: Array<Role>;
};


export type QueryCalendarArgs = {
  input: CalendarGetEvents;
};


export type QueryCalendarEpochArgs = {
  input: CalendarGetEvents;
};

export type Repeat = {
  __typename?: 'Repeat';
  delay?: Maybe<Scalars['Int']['output']>;
  repeatData?: Maybe<Scalars['String']['output']>;
  repeatType?: Maybe<RepeatTypes>;
  repeatUntil?: Maybe<Scalars['String']['output']>;
};

export enum RepeatTypes {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  MonthlyByWeek = 'MONTHLY_BY_WEEK',
  Weekly = 'WEEKLY',
  Yearly = 'YEARLY'
}

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type UpdatedEvent = {
  __typename?: 'UpdatedEvent';
  comment?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['Int']['output']>;
  eventId: Scalars['Int']['output'];
  eventStatus?: Maybe<EventStatus>;
  repeat?: Maybe<Repeat>;
  startTime?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};
