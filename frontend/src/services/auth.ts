import { cookies } from 'next/headers'

export type SessionUser = {
   user: string
   profileImageUrl: string | null
}

export async function getSessionUser(): Promise<SessionUser | null> {
   const backendUrl = process.env.BACKEND_API_URL
   if (!backendUrl) {
      throw new Error('BACKEND_API_URL is not set')
   }

   const sessionCookieName = process.env.SESSION_COOKIE_NAME ?? 'qd_session'
   const cookieStore = await cookies()
   const sessionToken = cookieStore.get(sessionCookieName)?.value
   const response = await fetch(`${backendUrl}/auth/pinterest/me`, {
      headers: sessionToken ? { cookie: `${sessionCookieName}=${sessionToken}` } : undefined,
      cache: 'no-store',
   })

   if (!response.ok) {
      return null
   }

   return (await response.json()) as SessionUser
}
