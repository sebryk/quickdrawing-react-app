'use client'

import ObjectsFormSelect from '@/components/objects-form/components/select'
import MainButton from '@/components/ui/buttons/main-button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { resetPinSelection } from '@/store/slices/pins-slice'
import { data } from './data'
import { selectStyles, options } from './settings'
import styles from './styles.module.scss'

const ControlBar = () => {
   const dispatch = useAppDispatch()
   const { mainButton, secondaryButton, selectOption } = data
   const selectedTime = selectOption[0]
   const selectedPinCount = useAppSelector((state) => state.pins.selectedPins.length)

   return (
      <div className={styles['control-bar']}>
         {selectedPinCount > 0 ? (
            <>
               {/* <div className={styles['control-bar__count']}>
                  <span className={styles['control-bar__value']}>{selectedPinCount}</span>
                  <span className={styles['control-bar__label']}>{title}</span>
               </div> */}
               <ObjectsFormSelect
                  isVisible={true}
                  isClearable={false}
                  key={selectedTime.name}
                  name={selectedTime.name}
                  customStyles={selectStyles}
                  options={options[selectedTime.name]}
                  placeholder={selectedTime.placeholder}
                  className={styles['control-bar__select']}
               >
                  {selectedTime.name}
               </ObjectsFormSelect>
               <MainButton
                  type="button"
                  variant="transparent"
                  onClick={() => dispatch(resetPinSelection())}
                  className={styles['control-bar__reset-button']}
               >
                  {secondaryButton.title}
               </MainButton>
               <MainButton href={mainButton.href} className={styles['control-bar__start-button']}>
                  {mainButton.title}
               </MainButton>
            </>
         ) : (
            <p className={styles['control-bar__empty']}>{data.emptyText}</p>
         )}
      </div>
   )
}

export default ControlBar
