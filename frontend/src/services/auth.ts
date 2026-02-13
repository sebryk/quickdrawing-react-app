import { cookies } from 'next/headers'

export type SessionUser = {
   user: string
   profile_image: string
}

export async function getSessionUser(): Promise<SessionUser | null> {
   const backendUrl = process.env.BACKEND_API_URL
   if (!backendUrl) {
      throw new Error('BACKEND_API_URL is not set')
   }

   const cookieStore = await cookies()
   const qd_session = cookieStore.get('qd_session')?.value
   const response = await fetch(`${backendUrl}/auth/pinterest/me`, {
      headers: qd_session ? { cookie: `qd_session=${qd_session}` } : undefined,
      cache: 'no-store',
   })

   if (!response.ok) {
      return null
   }

   return (await response.json()) as SessionUser
}
