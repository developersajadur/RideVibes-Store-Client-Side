import { TQueryParam } from "@/types";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: "/order",
        method: "POST",
        body: userInfo,
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: (args: { orderId: string; status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled" }) => {
        const { orderId, status } = args;
        return {
          url: `/order/change-status/${orderId}`,
          method: "POST",
          body: { status }, 
        };
      },
      invalidatesTags: ['orders']
    }),
    
    getOrders: builder.query({
        query: (args) => {
                // console.log(args);
                const params = new URLSearchParams();
        
                if (args) {
                  args.forEach((item: TQueryParam) => {
                    params.append(item.name, item.value as string);
                  });
                }
                return {
                  url: '/order',
                  method: 'GET',
                  params: params,
                };
              },
      providesTags: ['orders'],
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/order/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
    getMyOrders: builder.query({
      query: () => "/order/get-my-orders",
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
  useGetMyOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
