import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("token");
    headers.set("Authorization", `Bearer ${accessToken}`);
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/api/admin/login",
        method: "POST",
        body,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: "/vendor/forgot",
        method: "POST",
        body,
      }),
    }),
    getUser: builder.mutation({
      query: () => ({
        url: "/api/admin/info",
        method: "GET",
      }),
    }),
    getParent: builder.mutation({
      query: () => ({
        url: "/api/parent/info",
        method: "GET",
      }),
    }),
    verifiyAdmin: builder.query({
      query: (q) => ({
        url: `/api/admin/verify/email/${q}`,
        method: "GET",
      }),
    }),

    getAllParents: builder.query({
      query: (q) => ({
        url: `/api/parent/get-all-parents?${q}`,
        method: "GET",
      }),
    }),
    addParent: builder.mutation({
      query: (body) => ({
        url: "/api/parent/create-parent",
        method: "POST",
        body,
      }),
    }),
    deleteParent: builder.mutation({
      query: (id) => ({
        url: `/api/parent/delete-parent/${id}`,
        method: "DELETE",
      }),
    }),
    editParent: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/parent/update-parent/${id}`,
        method: "PUT",
        body,
      }),
    }),
    loginParent: builder.mutation({
      query: (body) => ({
        url: "/api/parent/get-parent-by-email-and-password",
        method: "POST",
        body,
      }),
    }),
    getParentByToken: builder.query({
      query: (q) => ({
        url: `/api/parent/get-parent-by-token`,
        method: "GET",
      }),
    }),

    getAllChildren: builder.query({
      query: (q) => ({
        url: `/api/children/get-all-children?${q}`,
        method: "GET",
      }),
    }),
    addChildren: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/children/create-child/${id}`,
        method: "POST",
        body,
      }),
    }),
    deleteChildren: builder.mutation({
      query: (id) => ({
        url: `/api/children/delete-child/${id}`,
        method: "DELETE",
      }),
    }),
    editChildren: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/children/update-child/${id}`,
        method: "PUT",
        body,
      }),
    }),
    checkFace: builder.mutation({
      query: (body) => ({
        url: "/check-face",
        method: "POST",
        body,
      }),
    }),
    addParentWithPassword: builder.mutation({
      query: (body) => ({
        url: "/api/parent/add",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useGetUserMutation,
  useGetAllParentsQuery,
  useAddParentMutation,
  useGetAllChildrenQuery,
  useDeleteParentMutation,
  useEditParentMutation,
  useAddChildrenMutation,
  useDeleteChildrenMutation,
  useEditChildrenMutation,
  useVerifiyAdminQuery,
  useCheckFaceMutation,
  useLoginParentMutation,
  useGetParentByTokenQuery,
  useGetParentMutation,
  useAddParentWithPasswordMutation,
} = apiSlice;
