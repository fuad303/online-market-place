import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { format } from "date-fns";

interface UploadResponse {
  profile: any;
  user: any;
  message: string;
  file: string;
}
const now = new Date();
const formattedDate = format(now, "yyyy_MM_dd HH_mm_ss.SSS");
const fileApi = createApi({
  reducerPath: "fileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    uploadProfileImage: builder.mutation<UploadResponse, { file: File }>({
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
    }),
  }),
});

export const useUploadProfileImageMutation =
  fileApi.endpoints.uploadProfileImage.useMutation;

export default fileApi;
