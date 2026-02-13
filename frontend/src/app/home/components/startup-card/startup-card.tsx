'use client'

import { useState } from 'react'
import MainButton from '@/components/ui/buttons/main-button'
import { getPinterestAuthUrl } from '@/app/home/actions/get-pinterest-auth-url '
import { FaPinterest } from 'react-icons/fa'

import styles from './styles.module.scss'
import { data } from './data'

import cn from 'classnames'
import { useRouter } from 'next/navigation'

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
      userSlug ? router.push(`/${userSlug}`) : handlePinterestAuth()
   }

   return (
      <div className={cn(styles['startup-card'], className)}>
         {buttons.map((button, index) => (
            <MainButton
               className={styles['startup-card__button']}
               onClick={index === 0 ? onQuickSession : handleLogin}
               key={index}
               variant={index === 0 ? 'primary' : 'accent'}
               disabled={index === 1 && isLoading}
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
