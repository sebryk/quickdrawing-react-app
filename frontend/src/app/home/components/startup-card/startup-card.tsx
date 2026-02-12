'use client'

import { useState, useTransition } from 'react'
import MainButton from '@/components/ui/buttons/main-button'
import { getPinterestAuthUrl } from '@/app/home/actions/get-pinterest-auth-url '

import styles from './styles.module.scss'
import { data } from './data'

import cn from 'classnames'

type StartupCardProps = {
   onQuickSession: () => void
   className?: string
}

const StartupCard = ({ onQuickSession, className }: StartupCardProps) => {
   const { buttons } = data
   const [error, setError] = useState('')
   const [isPending, startTransition] = useTransition()

   const handlePinterestAuth = () => {
      setError('')
      startTransition(async () => {
         try {
            const authUrl = await getPinterestAuthUrl()
            window.location.assign(authUrl)
         } catch {
            setError('Unable to start Pinterest auth. Please try again.')
         }
      })
   }

   return (
      <div className={cn(styles['startup-card'], className)}>
         {buttons.map((button, index) => (
            <MainButton
               onClick={index === 0 ? onQuickSession : handlePinterestAuth}
               key={index}
               variant={index === 0 ? 'primary' : 'accent'}
               disabled={index === 1 && isPending}
            >
               {button.title}
            </MainButton>
         ))}
         {error && <p>{error}</p>}
      </div>
   )
}

export default StartupCard
