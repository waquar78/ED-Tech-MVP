import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateMastery: builder.mutation({
            query: (data) => ({
                url: '/users/update-mastery',
                method: 'POST',
                body: data,
            }),
        }),
        getRecommendations: builder.query({
            query: (userId) => `/users/recommendations/${userId}`,
        }),
    }),
});

export const { useUpdateMasteryMutation, useGetRecommendationsQuery } = userApi;