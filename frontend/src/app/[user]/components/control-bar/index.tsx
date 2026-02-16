'use client'

import MainButton from '@/components/ui/buttons/main-button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { resetPinSelection } from '@/store/slices/pins-slice'
import { data } from './data'
import styles from './styles.module.scss'

const ControlBar = () => {
   const dispatch = useAppDispatch()
   const { title, mainButton, secondaryButton } = data
   const selectedPinCount = useAppSelector((state) => state.pins.selectedPinIds.length)

   return (
      <div className={styles['control-bar']}>
         <div className={styles['control-bar__count']}>
            <span className={styles['control-bar__value']}>{selectedPinCount}</span>
            <span className={styles['control-bar__label']}>{title}</span>
         </div>
         {selectedPinCount > 0 && (
            <MainButton
               type="button"
               variant="transparent"
               onClick={() => dispatch(resetPinSelection())}
               className={styles['control-bar__reset-button']}
            >
               {secondaryButton.title}
            </MainButton>
         )}
         <MainButton
            href={mainButton.href}
            disabled={selectedPinCount === 0}
            className={styles['control-bar__start-button']}
         >
            {selectedPinCount > 0 ? mainButton.title : mainButton.secondaryTitle}
         </MainButton>
      </div>
   )
}

export default ControlBar
