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
        updateUser: builder.mutation({
            query: (args) => ({
                url: 'users/update-user',
                method: 'PUT',
                body: args,
            }),
        })
    })
})


export const {useGetUserQuery, useUpdateUserMutation} = userApi;