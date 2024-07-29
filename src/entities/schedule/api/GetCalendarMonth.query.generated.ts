/* eslint-disable */
// prettier-ignore
import * as Types from '../../../shared/api/gql/graphql';

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
export type GetCalendarMonthQueryVariables = Types.Exact<{
  epochStart: Types.Scalars["Int"]["input"]
  epochEnd: Types.Scalars["Int"]["input"]
}>

export type GetCalendarMonthQuery = {
  __typename?: "Query"
  calendar: Array<{
    __typename?: "CalendarEventsByDay"
    day: any
    events: Array<{
      __typename?: "CalendarHumanReadable"
      id: number
      title: string
      comment: string | null
      dayEventStart: any
      endTime: any | null
    }>
  }>
}

export const GetCalendarMonthDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCalendarMonth" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "epochStart" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "epochEnd" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "calendar" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "endTime" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "epochEnd" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "startTime" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "epochStart" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "day" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "events" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "comment" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dayEventStart" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endTime" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCalendarMonthQuery,
  GetCalendarMonthQueryVariables
>
