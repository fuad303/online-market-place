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
//
interface GetUserPostsResponse {
  aPost: NotificationsInterface;
  userPosts: NotificationsInterface[];
}

interface UserCredentials {
  username: string;
  email: string;
  phone: string;
  message?: string;
}
const feedApi = createApi({
  reducerPath: "feedApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.105:4000/home/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getLatestNotifications: builder.query<
      FeedNotificationsInterface[],
      { page?: number; limit: number }
    >({
      query: ({ page = 1, limit = 15 }) => ({
        url: `feedmeed?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getAPost: builder.query<GetUserPostsResponse, string>({
      query: (id: string) => ({
        url: `getAPost/${id}`,
        method: "GET",
      }),
    }),
    getUserCredentials: builder.query<UserCredentials, string>({
      query: (seller: string) => ({
        url: `getUserCredentials/${seller}`,
        method: "GET",
      }),

      keepUnusedDataFor: 60,
    }),
  }),
});

export const {
  useGetLatestNotificationsQuery,
  useGetAPostQuery,
  useLazyGetUserCredentialsQuery,
} = feedApi;
export default feedApi;
