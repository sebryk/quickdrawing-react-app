import { Link, NavLink } from 'react-router-dom'
import useBurgerMenu from '@/hooks/useBurgerMenu'
import BurgerBtn from '../ui/buttons/burger-button/burger-button'
import { activeStyles, data, navigationItems } from './data'
import styles from './styles.module.scss'
import cn from 'classnames'

const Header = () => {
   const { logo } = data
   const { isBurgerMenuOpen, toggleBurgerMenu, menuRef, setIsBurgerMenuOpen } = useBurgerMenu()

   return (
      <header className={styles.header} ref={menuRef}>
         <Link to="/" className={styles.logo} onClick={() => setIsBurgerMenuOpen(false)}>
            {logo}
         </Link>
         <nav
            className={cn(styles.header__nav, styles.nav, {
               [styles['header__nav--show']]: isBurgerMenuOpen,
            })}
         >
            {navigationItems.map((item, index) => (
               <NavLink
                  key={index}
                  to={item.route}
                  className={styles.nav__listLink}
                  style={({ isActive }: { isActive: boolean }) => (isActive ? activeStyles : {})}
                  onClick={() => setIsBurgerMenuOpen(false)}
               >
                  {item.label}
               </NavLink>
            ))}
         </nav>
         <BurgerBtn toggleBurgerMenu={toggleBurgerMenu} isBurgerMenuOpen={isBurgerMenuOpen} />
      </header>
   )
}

export default Header
