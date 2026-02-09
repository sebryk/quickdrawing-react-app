import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Layout from '@/components/layout'
import Providers from './providers'
import '@/styles/global.scss'

export const metadata: Metadata = {
   title: 'WAVETAKE',
   description: 'Drawing practice app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="en">
         <body>
            <Providers>
               <Layout>{children}</Layout>
            </Providers>
         </body>
      </html>
   )
}
