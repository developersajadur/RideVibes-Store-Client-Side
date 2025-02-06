import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (args) => {
               return {
                url: `/users/user/${args}`,
                method: 'GET',
               }
            }
        }),
        getAllUser: builder.query({
          query: (args) => {
              const params = new URLSearchParams();
      
              if (args) {
                args.forEach((item: TQueryParam) => {
                  params.append(item.name, item.value as string);
                });
              }
              return {
                url: '/users',
                method: 'GET',
                params: params,
              };
            },
            providesTags: ['users'],
        transformResponse: (response: TResponseRedux<any>) => {
          return {
            data: response.data,
          };
        },
      }),
        updateUser: builder.mutation({
          query: (updatedData) => {
            return {
              url: '/users/update-user',
              method: "PUT",
              body: updatedData, 
            };
          },
          invalidatesTags: ['users']
        }),
        changePassword: builder.mutation({
            query: (args) => ({
                url: 'users/change-password',
                method: 'POST',
                body: args,
            }),
        }),
        blockUser: builder.mutation({
            query: (userId) => {
             return {
              url: '/users/block-user',
              method: 'POST',
              body: {userId},
             }
            },
        }),
        unBlockUser: builder.mutation({
            query: (userId) => ({
                url: '/users/unblock-user',
                method: 'POST',
                body: {userId},
            }),
        }),
    })
});

export const {useGetUserQuery, useUpdateUserMutation, useChangePasswordMutation, useGetAllUserQuery, useBlockUserMutation, useUnBlockUserMutation} = userApi;
