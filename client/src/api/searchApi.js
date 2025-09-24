import { apiSlice } from './apiSlice';

export const searchApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        ragSearch: builder.mutation({
            query: (query) => ({
                url: '/search',
                method: 'POST',
                body: { query },
            }),
        }),
    }),
});

export const { useRagSearchMutation } = searchApi;