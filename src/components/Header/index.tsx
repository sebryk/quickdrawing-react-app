import { Link, NavLink } from 'react-router-dom'
import useBurgerMenu from '@/hooks/useBurgerMenu'
import BurgerBtn from '../ui/buttons/burger-button/burger-button'
import { activeStyles, data, navigationItems } from './data'
import styles from './styles.module.scss'

const Header = () => {
   const { logo } = data
   const { isBurgerMenuOpen, toggleBurgerMenu, menuRef, setIsBurgerMenuOpen } = useBurgerMenu()

   return (
      <header className={styles.header} ref={menuRef}>
         <Link to="/" className={styles.logo} onClick={() => setIsBurgerMenuOpen(false)}>
            {logo}
         </Link>
         <nav
            className={`${styles.header__nav} ${styles.nav} ${isBurgerMenuOpen ? styles['header__nav--show'] : ''}`}
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
