import { FC } from 'react';
import './Burger.css';

interface BurgerBtnProps {
  toggleBurgerMenu: () => void
  isBurgerMenuOpen: boolean
}

const BurgerBtn: FC<BurgerBtnProps> = ({ toggleBurgerMenu, isBurgerMenuOpen }) => {
  return ( 
  <div 
  onClick={toggleBurgerMenu}
  className={`nav-icon icon ${isBurgerMenuOpen ? 'icon--active' : ''}`}>
    <span className="icon__stripe"></span>
    <span className="icon__stripe"></span>
    <span className="icon__stripe"></span>
  </div>

)}
export default BurgerBtn;