import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import styles from './styles.module.scss'

type PageProps = {
   params: { user: string }
}

async function getSessionUser() {
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

   return await response.json()
}

export default async function UserPage({ params }: PageProps) {
   const session = await getSessionUser()
   const { user } = await params

   if (!session || session.user !== user) {
      notFound()
   }

   const username = decodeURIComponent(session.user)

   return (
      <main className={styles.page}>
         <section className={styles.card}>
            <p className={styles.eyebrow}>Личный кабинет</p>
            <h1 className={styles.title}>{username}</h1>
            <p className={styles.subtitle}>Вы успешно авторизовались через Pinterest.</p>
         </section>
      </main>
   )
}
