'use client'

import MainButton from '@/components/ui/buttons/main-button'

import styles from './styles.module.scss'
import { data } from './data'

import cn from 'classnames'

type StartupCardProps = {
   onQuickSession: () => void
   className?: string
}

const StartupCard = ({ onQuickSession, className }: StartupCardProps) => {
   const { buttons } = data
   return (
      <div className={cn(styles['startup-card'], className)}>
         {buttons.map((button, index) => (
            <MainButton
               onClick={index === 0 ? onQuickSession : undefined}
               key={index}
               variant={index === 0 ? 'primary' : 'accent'}
            >
               {button.title}
            </MainButton>
         ))}
      </div>
   )
}

export default StartupCard
