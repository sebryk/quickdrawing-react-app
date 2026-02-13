import { notFound } from 'next/navigation'
import { getSessionUser } from '@/services/auth'
import styles from './styles.module.scss'
import Image from 'next/image'
import IconButton from '@/components/ui/buttons/icon-button'
import { CiUser } from 'react-icons/ci'

type PageProps = {
   params: { user: string }
}

export default async function UserPage({ params }: PageProps) {
   const session = await getSessionUser()
   const { user } = await params

   console.log(session)

   if (!session || session.user !== user) {
      notFound()
   }

   const username = decodeURIComponent(session.user)

   return (
      <main className={styles.account}>
         <div className={styles.account__user}>
            {session.profileImageUrl ? (
               <Image
                  className={styles['account__user-image']}
                  src={session.profileImageUrl}
                  alt={`User ${username} picture`}
                  width={100}
                  height={100}
               />
            ) : (
               <div className={styles['account__user-placeholder']}>
                  <CiUser />
               </div>
            )}

            <p className={styles['account__user-name']}>{username}</p>
            <IconButton variant="logout" />
         </div>
      </main>
   )
}
