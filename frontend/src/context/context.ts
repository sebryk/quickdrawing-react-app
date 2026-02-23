import {
   QueryActionCreatorResult,
   QueryDefinition,
   BaseQueryFn,
   FetchArgs,
   FetchBaseQueryError,
   FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { createContext } from 'react'
import { IImage } from '../api/types'

export interface IDataContext {
   data: IImage[]
   refetch: () => QueryActionCreatorResult<
      QueryDefinition<
         Record<string, string | number>,
         // eslint-disable-next-line @typescript-eslint/no-empty-object-type
         BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
         never,
         IImage[],
         'imagesApi'
      >
   >
}

export const DataContext = createContext<IDataContext | null>(null)
