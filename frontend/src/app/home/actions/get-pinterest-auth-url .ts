'use server'

export const getPinterestAuthUrl = async () => {
   const backendUrl = process.env.BACKEND_API_URL
   const response = await fetch(`${backendUrl}/auth/pinterest/url`, {
      cache: 'no-store',
   })

   if (!response.ok) {
      throw new Error('Failed to start Pinterest OAuth flow')
   }

   const payload = (await response.json()) as { url: string }
   return payload.url
}
