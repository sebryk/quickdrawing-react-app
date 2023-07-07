import { Link, NavLink } from "react-router-dom";
import { useState } from 'react';
import BurgerBtn from "./BurgerBtn";

function Header() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const activeStyles = {
    color: "#f12354",
  }
  return ( 
    <header className="header container">
      <Link to="/" className="header__logo">QUICKDRAWING</Link>
      <nav className={`header__nav nav ${isBurgerMenuOpen ? 'header__nav--show' : ''}` }>
          <NavLink 
            to="/" 
            className="nav__list"
            style={({isActive}) => isActive ? activeStyles : null}
            onClick={() => setIsBurgerMenuOpen(false)}
          >
              Home
          </NavLink>
          <NavLink 
            to="about" 
            className="nav__list"
            style={({isActive}) => isActive ? activeStyles : null}
            onClick={() => setIsBurgerMenuOpen(false)}
          >
              About
          </NavLink>
          <NavLink 
            to="contact" 
            className="nav__list"
            style={({isActive}) => isActive ? activeStyles : null}
            onClick={() => setIsBurgerMenuOpen(false)}
          >
              Contact
          </NavLink>
      </nav>
          <BurgerBtn
            toggleBurgerMenu={toggleBurgerMenu}
            isBurgerMenuOpen={isBurgerMenuOpen}
          />
    </header>
   );
}

export default Header;