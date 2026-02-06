import { useEffect, useRef, useState } from 'react'

const useBurgerMenu = () => {
   const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
   const menuRef = useRef<HTMLDivElement>(null)

   const toggleBurgerMenu = () => {
      setIsBurgerMenuOpen(!isBurgerMenuOpen)
   }

   const handleClickOutside = (event: MouseEvent) => {
      if (
         menuRef.current &&
         event.target instanceof Node &&
         !menuRef.current.contains(event.target)
      ) {
         setIsBurgerMenuOpen(false)
      }
   }

   useEffect(() => {
      if (isBurgerMenuOpen) {
         document.body.classList.add('scroll-lock')
      } else {
         document.body.classList.remove('scroll-lock')
      }

      document.addEventListener('click', handleClickOutside)
      return () => {
         document.removeEventListener('click', handleClickOutside)
         document.body.classList.remove('scroll-lock')
      }
   }, [isBurgerMenuOpen])

   return { isBurgerMenuOpen, toggleBurgerMenu, menuRef, setIsBurgerMenuOpen }
}

export default useBurgerMenu
