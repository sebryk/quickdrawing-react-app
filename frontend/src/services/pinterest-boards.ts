import { cookies } from 'next/headers'
import type { AccountPin } from './pinterest-pins'

export type AccountBoard = {
   id: string
   name: string | null
   description: string | null
   privacy: string | null
   createdAt: string | null
   imageUrl: string | null
}

export type AccountBoardWithPins = AccountBoard & {
   previewPins: AccountPin[]
   pins: AccountPin[]
}

type BoardsListResponse = {
   items: AccountBoard[]
   bookmark: string | null
}

type BoardPinsListResponse = {
   items: AccountPin[]
   bookmark: string | null
}

function getAuthHeaders(sessionCookieName: string, sessionToken?: string) {
   return sessionToken ? { cookie: `${sessionCookieName}=${sessionToken}` } : undefined
}

export async function getPinterestBoards(pageSize = 24): Promise<BoardsListResponse | null> {
   const backendUrl = process.env.BACKEND_API_URL
   if (!backendUrl) {
      throw new Error('BACKEND_API_URL is not set')
   }

   const sessionCookieName = process.env.SESSION_COOKIE_NAME ?? 'qd_session'
   const cookieStore = await cookies()
   const sessionToken = cookieStore.get(sessionCookieName)?.value
   const response = await fetch(`${backendUrl}/pinterest/boards?page_size=${pageSize}`, {
      headers: getAuthHeaders(sessionCookieName, sessionToken),
      cache: 'no-store',
   })

   if (!response.ok) {
      return null
   }

   return (await response.json()) as BoardsListResponse
}

export async function getPinterestBoardPins(boardId: string, pageSize = 250): Promise<BoardPinsListResponse | null> {
   const backendUrl = process.env.BACKEND_API_URL
   if (!backendUrl) {
      throw new Error('BACKEND_API_URL is not set')
   }

   const sessionCookieName = process.env.SESSION_COOKIE_NAME ?? 'qd_session'
   const cookieStore = await cookies()
   const sessionToken = cookieStore.get(sessionCookieName)?.value
   const response = await fetch(`${backendUrl}/pinterest/boards/${boardId}/pins?page_size=${pageSize}`, {
      headers: getAuthHeaders(sessionCookieName, sessionToken),
      cache: 'no-store',
   })

   if (!response.ok) {
      return null
   }

   return (await response.json()) as BoardPinsListResponse
}
