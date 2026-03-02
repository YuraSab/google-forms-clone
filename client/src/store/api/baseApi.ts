import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: 'http://localhost:4000/',
  }),
  tagTypes: ['Forms', 'Responses'],
  endpoints: () => ({}), // Endpoints will be added automatically from code generation
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    GetForms: {
      providesTags: ['Forms'],
    },
    CreateForm: {
      invalidatesTags: ['Forms'],
    },
    GetForm: {
      providesTags: (result, error, arg) => [{ type: 'Forms', id: arg.id }],
    },
    SubmitResponse: {
      invalidatesTags: ['Responses', 'Forms'],
    },
    GetResponses: {
      providesTags: ['Responses'],
    },
  },
});