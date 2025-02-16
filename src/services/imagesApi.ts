import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IImage, IImageData, QueryParams } from './types';
import { randomizeImages } from '../utils/randomizeImages';

export const imagesApi = createApi({
   reducerPath: 'imagesApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://api.unsplash.com/',
      prepareHeaders: (headers) => {
         headers.set('Authorization', `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`);
         return headers;
      },
   }),
   endpoints: (builder) => ({
      getImagesByType: builder.query<IImage[], QueryParams>({
         query: ({ query, page }) => ({
            url: 'search/photos',
            params: {
               query,
               page,
               per_page: 30,
            },
         }),
         transformResponse: (response: IImageData, _, { count }) => {
            return randomizeImages(count, response.results);
         },
      }),
   }),
});

export const { useGetImagesByTypeQuery } = imagesApi;
