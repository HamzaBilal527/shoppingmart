import { BRANDS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const brandsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({
        url: BRANDS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Brands'],
    }),

    createBrand: builder.mutation({
      query: () => ({
        url: `${BRANDS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Brands'],
    }),
    updateBrand: builder.mutation({
      query: (data) => ({
        url: `${BRANDS_URL}/${data.brandId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Brands'],
    }),

    deleteBrand: builder.mutation({
      query: (brandId) => ({
        url: `${BRANDS_URL}/${brandId}`,
        method: 'DELETE',
      }),
      providesTags: ['Brand'],
    }),

    getBrandDetails: builder.query({
      query: (brandId) => ({
        url: `${BRANDS_URL}/${brandId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandDetailsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandsApiSlice;
