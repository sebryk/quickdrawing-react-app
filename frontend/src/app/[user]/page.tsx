import { notFound } from 'next/navigation'
import { getSessionUser } from '@/services/auth'
import styles from './styles.module.scss'
import Image from 'next/image'

type PageProps = {
   params: { user: string }
}

export default async function UserPage({ params }: PageProps) {
   const session = await getSessionUser()
   const { user } = await params

   if (!session || session.user !== user) {
      notFound()
   }

   console.log(session)

   const username = decodeURIComponent(session.user)

   return (
      <main className={styles.page}>
         <div className={styles.user}>
            <Image
               className={styles.user_image}
               src={session.profile_image}
               alt={username}
               width={100}
               height={100}
            />
            <p className={styles.user_name}>{username}</p>
         </div>
      </main>
   )
}
