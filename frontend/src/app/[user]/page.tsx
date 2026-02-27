import Link from 'next/link'
import { notFound } from 'next/navigation'

import { data as headerData } from '@/components/header/data'
import IconButton from '@/components/ui/buttons/icon-button'
import { getSessionUser } from '@/services/auth'
import {
   type AccountBoardWithPins,
   getPinterestBoardPins,
   getPinterestBoards,
} from '@/services/pinterest-boards'

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
   const boardsResponse = await getPinterestBoards()
   const { items: boards = [] } = boardsResponse ?? {}
   const boardsWithPins: AccountBoardWithPins[] = await Promise.all(
      boards.map(async (board) => {
         const boardPinsResponse = await getPinterestBoardPins(board.id)
         const pins = boardPinsResponse?.items ?? []

         return {
            ...board,
            previewPins: pins.slice(0, 4),
            pins,
         }
      }),
   )
   const { logo } = headerData

   return (
      <main className={styles.account}>
         <div className={styles['account-header']}>
            <div className={styles['account-header__left']}>
               <IconButton href="/" variant="back" />
               <Link href="/" className={styles['account-header__logo']}>
                  {logo}
               </Link>
            </div>
            <UserInfo username={username} profileImageUrl={session.profileImageUrl} />
         </div>
         <PinsList boards={boardsWithPins} />
         <ControlBar />
      </main>
   )
}
