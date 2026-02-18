import { cookies } from 'next/headers'

export type AccountPin = {
   id: string
   title: string | null
   description: string | null
   link: string | null
   createdAt: string | null
   imageUrl: string | null
}

type PinsListResponse = {
   items: AccountPin[]
   bookmark: string | null
}

export async function getPinterestPins(pageSize = 24): Promise<PinsListResponse | null> {
   const backendUrl = process.env.BACKEND_API_URL
   if (!backendUrl) {
      throw new Error('BACKEND_API_URL is not set')
   }

   const sessionCookieName = process.env.SESSION_COOKIE_NAME ?? 'qd_session'
   const cookieStore = await cookies()
   const sessionToken = cookieStore.get(sessionCookieName)?.value
   const response = await fetch(`${backendUrl}/pinterest/pins?page_size=${pageSize}`, {
      headers: sessionToken ? { cookie: `${sessionCookieName}=${sessionToken}` } : undefined,
      cache: 'no-store',
   })

   if (!response.ok) {
      return null
   }

   return (await response.json()) as PinsListResponse
}

export async function getPinterestPin(pinId: string): Promise<AccountPin | null> {
   const backendUrl = process.env.BACKEND_API_URL
   if (!backendUrl) {
      throw new Error('BACKEND_API_URL is not set')
   }

   const sessionCookieName = process.env.SESSION_COOKIE_NAME ?? 'qd_session'
   const cookieStore = await cookies()
   const sessionToken = cookieStore.get(sessionCookieName)?.value
   const response = await fetch(`${backendUrl}/pinterest/pins/${pinId}`, {
      headers: sessionToken ? { cookie: `${sessionCookieName}=${sessionToken}` } : undefined,
      cache: 'no-store',
   })

   if (!response.ok) {
      return null
   }

   return (await response.json()) as AccountPin
}
