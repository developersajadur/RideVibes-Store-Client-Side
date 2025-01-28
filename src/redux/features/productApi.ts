import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
        query: (args) => {
            // console.log(args);
            const params = new URLSearchParams();
    
            if (args) {
              args.forEach((item: TQueryParam) => {
                params.append(item.name, item.value as string);
              });
            }
            return {
              url: '/bicycles',
              method: 'GET',
              params: params,
            };
          },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleProductBySlug: builder.query({
      query: (args) => {
        // console.log(args);
        return {
          url: `/bicycles/get-a-product/${args.slug}`,
          method: 'GET',
          body: args.data,
        }
      }
    })
  }),
});

export const { useGetAllProductsQuery, useGetSingleProductBySlugQuery } = productApi;
export default productApi;
