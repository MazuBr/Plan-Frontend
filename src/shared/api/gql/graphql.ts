/* eslint-disable */
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
  DateTime: { input: any; output: any; }
};

export type Calendar = {
  __typename?: 'Calendar';
  comment: Scalars['String']['output'];
  endTime: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  repeat: Repeat;
  startTime: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type CalendarCreateEvent = {
  comment?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['Int']['input']>;
  startTime: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CalendarEventsByDay = {
  __typename?: 'CalendarEventsByDay';
  events: Array<CalendarHumanReadble>;
};

export type CalendarGetEvents = {
  endTime: Scalars['Int']['input'];
  startTime: Scalars['Int']['input'];
};

export type CalendarHumanReadble = {
  __typename?: 'CalendarHumanReadble';
  comment: Scalars['String']['output'];
  dayEventStart: Scalars['DateTime']['output'];
  endTime: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  repeat: Repeat;
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent: Calendar;
  createRole: Role;
};


export type MutationCreateEventArgs = {
  input: CalendarCreateEvent;
};


export type MutationCreateRoleArgs = {
  input: RoleInput;
};

export type Query = {
  __typename?: 'Query';
  calendar: Array<CalendarEventsByDay>;
  roles: Array<Role>;
};


export type QueryCalendarArgs = {
  input: CalendarGetEvents;
};

export type Repeat = {
  __typename?: 'Repeat';
  isRepeat: Scalars['Boolean']['output'];
  repeatUntil: Scalars['String']['output'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type RoleInput = {
  name: Scalars['String']['input'];
};
