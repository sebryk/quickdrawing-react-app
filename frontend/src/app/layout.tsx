import type { Metadata } from 'next'

import type { ReactNode } from 'react'

import Providers from './providers'
import '@/styles/global.scss'

export const metadata: Metadata = {
   title: 'WAVETAKE',
   description: 'Drawing fast and consistently',
   icons: {
      icon: '/favicon.svg',
   },
}

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="en">
         <body>
            <Providers>{children}</Providers>
         </body>
      </html>
   )
}
