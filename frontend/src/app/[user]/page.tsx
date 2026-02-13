import { notFound } from 'next/navigation'
import { getSessionUser } from '@/services/auth'
import styles from './styles.module.scss'
import UserInfo from './user-info'

type PageProps = {
   params: { user: string }
}

export default async function UserPage({ params }: PageProps) {
   const session = await getSessionUser()
   const { user } = await params

   if (!session || session.user !== user) {
      notFound()
   }

   const username = decodeURIComponent(session.user)

   return (
      <main className={styles.account}>
         <UserInfo username={username} profileImageUrl={session.profileImageUrl} />
      </main>
   )
}
