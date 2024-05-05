import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import BurgerBtn from "../BurgerBtn/BurgerBtn";
import './Header.css'
import { Styles } from "./Types";

const Header = () => {

  const navigationItems = [
    { route: "/", label: "Home" },
    { route: "/about", label: "About" },
    { route: "/contact", label: "Contact" },
  ];
  

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if(menuRef.current && event.target instanceof Node &&  !menuRef.current.contains(event.target)){
      setIsBurgerMenuOpen(false);
    }
  }

  useEffect(() => {
    if(isBurgerMenuOpen) {
      document.body.classList.add('scroll-lock')
    } else {
      document.body.classList.remove('scroll-lock')
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.classList.remove('scroll-lock');
    };

  },[isBurgerMenuOpen])

  const activeStyles: Styles = {
    color: "#f12354",
  }

  return ( 
    <header 
    className="header container"     
    ref={menuRef} >
      <Link
        to="/" 
        className="header__logo logo"
        onClick={() => setIsBurgerMenuOpen(false)}
      >
        QUICKDRAWING
      </Link>
      <nav 
      className={`header__nav nav ${isBurgerMenuOpen ? 'header__nav--show' : ''}` } >
        {navigationItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.route}
            className="nav__list-link"
            style={({isActive}: {isActive: boolean}) => isActive ? activeStyles : {}}
            onClick={() => setIsBurgerMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
          <BurgerBtn
            toggleBurgerMenu={toggleBurgerMenu}
            isBurgerMenuOpen={isBurgerMenuOpen}
          />
    </header>
   );
}

export default Header;