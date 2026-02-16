'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { CiUser } from 'react-icons/ci'
import { FiUser } from 'react-icons/fi'
import IconButton from '@/components/ui/buttons/icon-button'
import styles from './styles.module.scss'

type UserInfoProps = {
   username: string
   profileImageUrl: string | null
}

const UserInfo = ({ username, profileImageUrl }: UserInfoProps) => {
   const router = useRouter()
   const [isPending, setIsPending] = useState(false)
   const [isMenuOpen, setIsMenuOpen] = useState(false)

   const toggleRef = useRef<HTMLButtonElement | null>(null)
   const menuRef = useRef<HTMLDivElement | null>(null)

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

   useEffect(() => {
      if (!isMenuOpen) {
         return
      }

      const handleClickOutside = (event: MouseEvent) => {
         const target = event.target as Node
         if (toggleRef.current?.contains(target) || menuRef.current?.contains(target)) {
            return
         }
         setIsMenuOpen(false)
      }

      const handleEscape = (event: KeyboardEvent) => {
         if (event.key === 'Escape') {
            setIsMenuOpen(false)
         }
      }

      window.addEventListener('mousedown', handleClickOutside)
      window.addEventListener('keydown', handleEscape)

      return () => {
         window.removeEventListener('mousedown', handleClickOutside)
         window.removeEventListener('keydown', handleEscape)
      }
   }, [isMenuOpen])

   return (
      <div className={styles.user}>
         <button
            type="button"
            ref={toggleRef}
            className={styles['user-toggle']}
            onClick={() => setIsMenuOpen((prev) => !prev)}
         >
            {profileImageUrl ? (
               <Image
                  width={38}
                  height={38}
                  src={profileImageUrl}
                  alt={`User ${username} picture`}
                  className={styles['user-image']}
               />
            ) : (
               <span className={styles['user-placeholder']}>
                  <CiUser />
               </span>
            )}
         </button>
         {isMenuOpen && (
            <div ref={menuRef} className={styles['user-menu']}>
               <div className={styles['user-menu__user']}>
                  <FiUser className={styles['user-menu__user-icon']} />
                  <p className={styles['user-menu__user-name']}>{username}</p>
               </div>
               <div className={styles['user-menu__divider']}></div>
               <div
                  tabIndex={0}
                  role="button"
                  onClick={handleLogout}
                  className={styles['user-menu__logout']}
               >
                  <IconButton variant="logout" />
                  <p className={styles['user-menu__user-name']}>Logout</p>
               </div>
            </div>
         )}
      </div>
   )
}

export default UserInfo
