'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CiUser } from 'react-icons/ci'
import IconButton from '@/components/ui/buttons/icon-button'
import styles from './styles.module.scss'

type UserInfoProps = {
   username: string
   profileImageUrl: string | null
}

const UserInfo = ({ username, profileImageUrl }: UserInfoProps) => {
   const router = useRouter()
   const [isPending, setIsPending] = useState(false)

   const handleLogout = async () => {
      if (isPending) {
         return
      }

      setIsPending(true)

      try {
         await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
         })
      } finally {
         router.replace('/')
         router.refresh()
      }
   }

   return (
      <div className={styles.account__user}>
         {profileImageUrl ? (
            <Image
               className={styles['account__user-image']}
               src={profileImageUrl}
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
         <IconButton variant="logout" onClick={handleLogout} disabled={isPending} ariaLabel="Log out" />
      </div>
   )
}

export default UserInfo
