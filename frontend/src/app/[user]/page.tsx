import { notFound } from 'next/navigation'
import { getSessionUser } from '@/services/auth'
import { getPinterestPins } from '@/services/pinterest-pins'
import styles from './styles.module.scss'
import PinsList from './pins-list'
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
   const pinsResponse = await getPinterestPins()
   const pins = pinsResponse?.items ?? []

   return (
      <main className={styles.account}>
         <UserInfo username={username} profileImageUrl={session.profileImageUrl} />
         <PinsList pins={pins} />
      </main>
   )
}
