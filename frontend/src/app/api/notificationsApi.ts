import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface NotificationsInterface {
  _id: string;
  title: string;
  category: string;
  subCategory?: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  seller: string;
  createdAt?: Date;
}

interface Deleteresponse {
  message: string;
}

const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.105:4000/notifications/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserPosts: builder.query<NotificationsInterface[], void>({
      query: () => ({
        url: "getAuserNotifications",
        method: "GET",
      }),
    }),

    deleteAPost: builder.mutation<Deleteresponse, string>({
      query: (id) => ({
        url: `deleteANotification${id}`,
        method: "DELETE",
      }),
    }),
    search: builder.query<NotificationsInterface[], string>({
      query: (searchTerm: string) =>
        `searchNotifications?query=${encodeURIComponent(searchTerm)}`,
    }),
  }),
});

export const {
  useGetUserPostsQuery,
  useDeleteAPostMutation,
  useLazySearchQuery,
} = notificationsApi;
export default notificationsApi;
