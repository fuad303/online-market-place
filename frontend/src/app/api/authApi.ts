import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface User {
  phone: number;
  username: string;
  email: string;
  profileImage?: string;
  _id: string;
}

interface UpdateArgs {
  updatedInfo: Partial<User>;
  id: string;
}
const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<User, { username: string; password: string }>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: "auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
    update: builder.mutation<User, UpdateArgs>({
      query: ({ updatedInfo, id }) => ({
        url: `update/userProfile/${id}`,
        method: "POST",
        body: updatedInfo,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "GET",
      }),
      invalidatesTags: ["Auth"], // Invalidate cached authentication-related data
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useUpdateMutation,
  useLogoutMutation,
} = authApi;
export default authApi;
