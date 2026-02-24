import { cookies } from 'next/headers'

export type AccountBoard = {
   id: string
   name: string | null
   description: string | null
   privacy: string | null
   createdAt: string | null
   imageUrl: string | null
}

type BoardsListResponse = {
   items: AccountBoard[]
   bookmark: string | null
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
      headers: sessionToken ? { cookie: `${sessionCookieName}=${sessionToken}` } : undefined,
      cache: 'no-store',
   })

   if (!response.ok) {
      return null
   }

   return (await response.json()) as BoardsListResponse
}
