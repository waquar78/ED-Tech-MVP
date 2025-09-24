import { apiSlice } from "./apiSlice";

export const contentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllContent: builder.query({
      query: () => "/content",
    }),
    getContentBySubject: builder.query({
      query: (subject) => `/content/${subject}`,
    }),
  }),
});

export const { useGetAllContentQuery, useGetContentBySubjectQuery } = contentApi;