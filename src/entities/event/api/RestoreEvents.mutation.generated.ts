/* eslint-disable */
// prettier-ignore
import * as Types from '../../../shared/api/gql/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type RestoreEventsMutationVariables = Types.Exact<{
  eventIds: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
}>;


export type RestoreEventsMutation = { __typename?: 'Mutation', restoreEvent: Array<{ __typename?: 'UpdatedEvent', title: string | null }> };


export const RestoreEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestoreEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventIds"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<RestoreEventsMutation, RestoreEventsMutationVariables>;