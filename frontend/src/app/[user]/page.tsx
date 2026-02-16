import { notFound } from 'next/navigation'
import IconButton from '@/components/ui/buttons/icon-button'
import { getSessionUser } from '@/services/auth'
import { getPinterestPins } from '@/services/pinterest-pins'
import ControlBar from './components/control-bar'
import PinsList from './components/pins-list'
import UserInfo from './components/user-info'
import styles from './styles.module.scss'

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
         <div className={styles['account-header']}>
            <IconButton href="/" variant="back" />
            <UserInfo username={username} profileImageUrl={session.profileImageUrl} />
         </div>
         <PinsList pins={pins} />
         <ControlBar />
      </main>
   )
}
