import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type ContainerStatus = {
  __typename?: 'ContainerStatus';
  container?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type Label = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type MetricValue = {
  __typename?: 'MetricValue';
  value?: Maybe<Scalars['Int']>;
};

export type PodStatus = {
  __typename?: 'PodStatus';
  pod?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
  label_app?: Maybe<Scalars['String']>;
  ready?: Maybe<MetricValue>;
  containers?: Maybe<Array<Maybe<ContainerStatus>>>;
  initContainers?: Maybe<ContainerStatus>;
};

export type Query = {
  __typename?: 'Query';
  podStatus?: Maybe<Array<Maybe<PodStatus>>>;
};

export type QueryPodStatusArgs = {
  labels?: Maybe<Array<Maybe<Label>>>;
  namespaces?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GetPodStatusQueryVariables = {
  labels?: Maybe<Array<Maybe<Label>>>;
  namespaces?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GetPodStatusQuery = { __typename?: 'Query' } & {
  podStatus: Maybe<
    Array<
      Maybe<
        { __typename?: 'PodStatus' } & Pick<
          PodStatus,
          'namespace' | 'pod' | 'label_app'
        > & {
            containers: Maybe<
              Array<
                Maybe<
                  { __typename?: 'ContainerStatus' } & Pick<
                    ContainerStatus,
                    'container' | 'image'
                  >
                >
              >
            >;
            ready: Maybe<
              { __typename?: 'MetricValue' } & Pick<MetricValue, 'value'>
            >;
          }
      >
    >
  >;
};

export const GetPodStatusDocument = gql`
  query GetPodStatus($labels: [Label], $namespaces: [String]) {
    podStatus(labels: $labels, namespaces: $namespaces) {
      namespace
      pod
      label_app
      containers {
        container
        image
      }
      ready {
        value
      }
    }
  }
`;

export function useGetPodStatusQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetPodStatusQuery,
    GetPodStatusQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetPodStatusQuery,
    GetPodStatusQueryVariables
  >(GetPodStatusDocument, baseOptions);
}
export type GetPodStatusQueryHookResult = ReturnType<
  typeof useGetPodStatusQuery
>;
export type GetPodStatusQueryResult = ApolloReactCommon.QueryResult<
  GetPodStatusQuery,
  GetPodStatusQueryVariables
>;
export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: []
  }
};

export default result;
