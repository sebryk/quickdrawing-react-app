import { FC } from 'react'
import styles from './styles.module.scss'

interface BurgerButtonProps {
   toggleBurgerMenu: () => void
   isBurgerMenuOpen: boolean
}

const BurgerButton: FC<BurgerButtonProps> = ({ toggleBurgerMenu, isBurgerMenuOpen }) => {
   const classes = ['nav-icon', styles.icon, isBurgerMenuOpen ? styles['icon--active'] : '']
      .filter(Boolean)
      .join(' ')

   return (
      <div onClick={toggleBurgerMenu} className={classes}>
         {[0, 1, 2].map((_, index) => (
            <span key={index} className={styles['icon-stripe']}></span>
         ))}
      </div>
   )
}

export default BurgerButton
