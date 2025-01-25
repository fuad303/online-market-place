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

const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserPosts: builder.query<NotificationsInterface[], void>({
      query: () => ({
        url: "notifications/getAuserNotifications",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserPostsQuery } = notificationsApi;
export default notificationsApi;
