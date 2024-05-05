import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IImage, IImageData } from './Types';
import { randomizeImages } from '../utils/randomizeImages';
import { useSelector } from 'react-redux';


const API_KEY = 'ngggzcmB9IjNm8W6Wzhqe0a0ut-FCTgS1P6VoHnxlSc';

export const imagesApi = createApi({
  reducerPath: 'imagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.unsplash.com/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Client-ID ${API_KEY}`);
      return headers;
    },
  }),
  endpoints: builder => ({
    getImagesByType: builder.query<IImage[], Record<string, string | number>>({
      query: (type) => `search/photos?query=${type.query}&page=${type.page}&per_page=30`,
      transformResponse: (response: IImageData, arg, arg2) => {
        return randomizeImages(Number(arg2.count), response.results) 
      }
    }),
  }),
});


export const { useGetImagesByTypeQuery } = imagesApi
