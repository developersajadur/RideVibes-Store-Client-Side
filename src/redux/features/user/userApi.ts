import { baseApi } from "@/redux/api/baseApi";


const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (args) => {
               return {
                url: `/users/user/${args}`,
                method: 'GET',
                body: args.data,
               }
            }
        }),
        updateProduct: builder.mutation({
            query: ({ productId, updatedData }) => {
              console.log("Updated Data before sending:", updatedData);
              return {
                url: `/bicycles/${productId}`,
                method: "PUT",
                body: updatedData, 
              };
            },
          }),          
        changePassword: builder.mutation({
            query: (args) => ({
                url: 'users/change-password',
                method: 'POST',
                body: args,
            }),
        }),
    })
})


export const {useGetUserQuery, useUpdateUserMutation, useChangePasswordMutation} = userApi;