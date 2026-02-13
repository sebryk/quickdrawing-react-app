import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
   const backendUrl = process.env.BACKEND_API_URL
   if (!backendUrl) {
      return NextResponse.json({ error: 'BACKEND_API_URL is not set' }, { status: 500 })
   }

   const sessionCookieName = process.env.SESSION_COOKIE_NAME ?? 'qd_session'
   const cookieStore = await cookies()
   const sessionToken = cookieStore.get(sessionCookieName)?.value

   let responseStatus = 502
   let success = false

   try {
      const response = await fetch(`${backendUrl}/auth/pinterest/logout`, {
         method: 'POST',
         headers: sessionToken ? { cookie: `${sessionCookieName}=${sessionToken}` } : undefined,
         cache: 'no-store',
      })
      responseStatus = response.ok ? 200 : response.status
      success = response.ok
   } catch {
      responseStatus = 502
      success = false
   }

   const result = NextResponse.json({ success }, { status: responseStatus })
   result.cookies.delete(sessionCookieName)

   return result
}
