import { createContext } from "react"
import { IImage } from "../services/Types"
import { 
  QueryActionCreatorResult, 
  QueryDefinition,BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta 
} from "@reduxjs/toolkit/query"

export interface IDataContext {
  data: IImage[],
  refetch: () => QueryActionCreatorResult<QueryDefinition<Record<string, string | number>, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, IImage[], "imagesApi">>
}

export const DataContext = createContext<IDataContext | null>(null)
