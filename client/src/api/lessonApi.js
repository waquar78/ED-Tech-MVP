import { apiSlice } from './apiSlice';

export const lessonApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        generateLesson: builder.mutation({
            query: (transcriptText) => ({
                url: '/lessons',
                method: 'POST',
                body: { transcriptText },
            }),
        }),
    }),
});

export const { useGenerateLessonMutation } = lessonApi;