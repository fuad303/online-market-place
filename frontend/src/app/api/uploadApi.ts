import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { format } from "date-fns";

interface UploadProfileResponse {
  profile: any;
  user: any;
  message: string;
  file: string;
}

export interface NotificationResponse {
  _id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  price: number;
  location: string;
  images: string[];
  seller: string;
  createdAt: string;
}

const now = new Date();
const formattedDate = format(now, "yyyy_MM_dd HH_mm_ss.SSS");
//
const fileApi = createApi({
  reducerPath: "fileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.105:4000/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    uploadProfileImage: builder.mutation<UploadProfileResponse, { file: File }>(
      {
        query: ({ file }) => {
          const formData = new FormData();
          const newName = `profile_image_${formattedDate}.jpg`;
          formData.append("profileImage", file, newName);
          console.log("The form data from the client: ", formData);

          return {
            url: "upploadd/profileImage",
            method: "POST",
            body: formData,
            headers: {},
          };
        },
      }
    ),
    createNotification: builder.mutation<NotificationResponse, FormData>({
      query: (formData) => ({
        url: "upploadd/makeNoti",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadProfileImageMutation, useCreateNotificationMutation } =
  fileApi;

export default fileApi;
