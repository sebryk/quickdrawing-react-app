'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useBurgerMenu from '@/hooks/useBurgerMenu'
import BurgerBtn from '../ui/buttons/burger-button/burger-button'
import { activeStyles, data, navigationItems } from './data'
import styles from './styles.module.scss'
import cn from 'classnames'

const Header = () => {
   const { logo } = data
   const { isBurgerMenuOpen, toggleBurgerMenu, menuRef, setIsBurgerMenuOpen } = useBurgerMenu()
   const pathname = usePathname()

   return (
      <header className={styles.header} ref={menuRef}>
         <Link href="/" className={styles.logo} onClick={() => setIsBurgerMenuOpen(false)}>
            {logo}
         </Link>
         <nav
            className={cn(styles.header__nav, styles.nav, {
               [styles['header__nav--show']]: isBurgerMenuOpen,
            })}
         >
            {navigationItems.map((item, index) => (
               <Link
                  key={index}
                  href={item.route}
                  className={styles.nav__listLink}
                  style={pathname === item.route ? activeStyles : {}}
                  onClick={() => setIsBurgerMenuOpen(false)}
               >
                  {item.label}
               </Link>
            ))}
         </nav>
         <BurgerBtn toggleBurgerMenu={toggleBurgerMenu} isBurgerMenuOpen={isBurgerMenuOpen} />
      </header>
   )
}

export default Header
