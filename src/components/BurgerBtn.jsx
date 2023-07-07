function BurgerBtn({ toggleBurgerMenu, isBurgerMenuOpen }) {
  console.log(isBurgerMenuOpen)
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