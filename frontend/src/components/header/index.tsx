'use client'

import cn from 'classnames'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import useBurgerMenu from '@/hooks/useBurgerMenu'

import BurgerBtn from '../ui/buttons/burger-button/burger-button'
import IconButton from '../ui/buttons/icon-button'
import { activeStyles, data, navigationItems } from './data'
import styles from './styles.module.scss'

const Header = () => {
   const { logo } = data
   const { isBurgerMenuOpen, toggleBurgerMenu, menuRef, setIsBurgerMenuOpen } = useBurgerMenu()
   const pathname = usePathname()
   const router = useRouter()

   const handleBack = () => {
      if (window.history.length > 1) {
         router.back()
      } else {
         router.push('/')
      }
   }

   return (
      <header
         ref={menuRef}
         className={cn(styles.header, { [styles['header--back']]: pathname !== '/' })}
      >
         {pathname !== '/' && <IconButton variant="back" onClick={handleBack} />}
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
                  onClick={() => setIsBurgerMenuOpen(false)}
                  style={pathname === item.route ? activeStyles : {}}
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
