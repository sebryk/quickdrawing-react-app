'use client'

import MainButton from '@/components/ui/buttons/main-button'

import styles from './styles.module.scss'
import { data } from './data'

type StartupCardProps = {
   onQuickSession: () => void
}

const StartupCard = ({ onQuickSession }: StartupCardProps) => {
   const { button, text, link } = data
   return (
      <div className={styles['startup-card']}>
         <div className={styles['startup-card__actions']}>
            <MainButton onClick={onQuickSession}>{button.tittle}</MainButton>
            <p className={styles['startup-card__text']}>{text}</p>
            <MainButton href={link.href} variant="accent" className={styles['startup-card__link']}>
               {link.title}
            </MainButton>
         </div>
      </div>
   )
}

export default StartupCard
