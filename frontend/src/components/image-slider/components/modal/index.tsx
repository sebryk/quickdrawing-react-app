'use client'

import { useRouter } from 'next/navigation'
import { useRef, useEffect } from 'react'
import { RxCross2 } from 'react-icons/rx'
import IconButton from '@/components/ui/buttons/icon-button'
import MainButton from '@/components/ui/buttons/main-button'
import { setMouseOver } from '@/store/slices/image-slider-slice'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { closeModal } from '../../../../store/slices/modal-slice'
import { resetSelectedOptions } from '../../../../store/slices/objects-form-slice'
import { data } from './data'
import styles from './styles.module.scss'

const Modal = () => {
   const dispatch = useAppDispatch()
   const imageSlider = useAppSelector((state) => state.imageSlider)
   const completionBar = useAppSelector((state) => state.completionBar)
   const modalRef = useRef<HTMLDivElement>(null)
   const router = useRouter()
   const { titles, buttons } = data

   const clearLocalStorage = () => {
      dispatch(closeModal())
      if (window.history.length > 1) {
         router.back()
      } else {
         router.push('/')
      }
      dispatch(resetSelectedOptions())
   }

   useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
         if (modalRef.current && e.target instanceof Node && !modalRef.current.contains(e.target)) {
            dispatch(closeModal())
         }
      }

      document.addEventListener('mousedown', handleOutsideClick)

      return () => {
         document.removeEventListener('mousedown', handleOutsideClick)
      }
   }, [])

   return (
      <div className={styles['modal']} onMouseOver={() => dispatch(setMouseOver())}>
         <div ref={modalRef} className={styles['modal__container']}>
            <IconButton
               type="button"
               variant="close"
               icon={RxCross2}
               className={styles['modal__close']}
               onClick={() => dispatch(closeModal())}
            />
            <p className={styles['modal__title']}>
               {imageSlider.isFinished && completionBar.completedPercentOfTime === 100
                  ? titles[0]
                  : titles[1]}
            </p>
            <div className={styles['modal__buttons-wrap']}>
               {buttons.map((button, index) => (
                  <MainButton
                     variant="primary"
                     key={button.title}
                     onClick={index === 0 ? () => dispatch(closeModal()) : clearLocalStorage}
                  >
                     {button.title}
                  </MainButton>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Modal
