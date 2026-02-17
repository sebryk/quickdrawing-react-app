'use client'

import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaPinterest } from 'react-icons/fa'

import { getPinterestAuthUrl } from '@/app/home/actions/get-pinterest-auth-url '
import MainButton from '@/components/ui/buttons/main-button'

import { data } from './data'
import styles from './styles.module.scss'

type StartupCardProps = {
   onQuickSession: () => void
   userSlug: string | null
   className?: string
}

const pinterestIcon = (
   <span className={styles['startup-card__icon-wrapper']}>
      <FaPinterest className={styles['startup-card__icon']} />
      <span className={styles['startup-card__text']}> Pinterest</span>
   </span>
)

const StartupCard = ({ onQuickSession, userSlug, className }: StartupCardProps) => {
   const { buttons } = data
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const router = useRouter()

   const handlePinterestAuth = async () => {
      setError('')
      setIsLoading(true)
      try {
         const authUrl = await getPinterestAuthUrl()
         window.location.assign(authUrl)
      } catch {
         setError('Pinterest auth failed. Please try again.')
         setIsLoading(false)
      }
   }

   const handleLogin = () => {
      if (userSlug) {
         router.push(`/${userSlug}`)
         return
      }
      handlePinterestAuth()
   }

   return (
      <div className={cn(styles['startup-card'], className)}>
         {buttons.map((button, index) => (
            <MainButton
               key={index}
               disabled={index === 1 && isLoading}
               className={styles['startup-card__button']}
               variant={index === 0 ? 'primary' : 'accent'}
               onClick={index === 0 ? onQuickSession : handleLogin}
            >
               {index === 1 && userSlug ? button.loggedInTitle : button.title}{' '}
               {index === 1 && !userSlug && pinterestIcon}
            </MainButton>
         ))}
         {error && <p>{error}</p>}
      </div>
   )
}

export default StartupCard
