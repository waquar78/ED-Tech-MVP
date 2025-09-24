import { apiSlice } from './apiSlice';

export const essayApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        scoreEssay: builder.mutation({
            query: (essayData) => ({
                url: '/essays/score',
                method: 'POST',
                body: essayData,
            }),
        }),
    }),
});

export const { useScoreEssayMutation } = essayApi;