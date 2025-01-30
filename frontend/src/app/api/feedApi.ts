import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
    baseUrl: "http://localhost:4000/",
  }),
  endpoints: (builder) => ({
    getLatestNotifications: builder.query<FeedNotificationsInterface[], void>({
      query: () => ({
        url: "feedmeed",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetLatestNotificationsQuery } = feedApi;
export default feedApi;
