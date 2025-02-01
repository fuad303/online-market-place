import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NotificationsInterface } from "./notificationsApi";
export interface FeedNotificationsInterface {
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
const feedApi = createApi({
  reducerPath: "feedApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/home/",
  }),
  endpoints: (builder) => ({
    getLatestNotifications: builder.query<FeedNotificationsInterface[], void>({
      query: () => ({
        url: "feedmeed",
        method: "GET",
      }),
    }),
    getAPost: builder.query<NotificationsInterface, string>({
      query: (id: string) => ({
        url: `getAPost/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetLatestNotificationsQuery, useGetAPostQuery } = feedApi;
export default feedApi;
