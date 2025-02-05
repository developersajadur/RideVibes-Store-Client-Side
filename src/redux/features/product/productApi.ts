import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
    query: (productInfo) => ({
      url: "/bicycles/create-bicycle",
      method: "POST",
      body: productInfo,
    }),
    invalidatesTags: ['products']
  }),
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
          providesTags: ['products'],
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
    }),
    getSingleProductById: builder.query({
      query: (args) => {
        // console.log(args);
        return {
          url: `/bicycles/${args.id}`,
          method: 'GET',
          body: args.data,
        }
      }
    }),
    updateProduct: builder.mutation({
      query: ({ productId, updatedData }) => {
        console.log(updatedData, productId);
        return {
          url: `/bicycles/${productId}`,
        method: "PUT",
        body: updatedData, 
        }
      },
      invalidatesTags: ['products']
    }),
    
    deleteProduct: builder.mutation({
      query: (productId) => {
        // console.log(args);
        return {
          url: `/bicycles/${productId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['products']
    }),
  }),
});

export const { useCreateProductMutation ,useGetAllProductsQuery, useGetSingleProductBySlugQuery, useGetSingleProductByIdQuery, useDeleteProductMutation, useUpdateProductMutation } = productApi;
export default productApi;
