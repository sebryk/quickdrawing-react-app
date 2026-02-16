'use client'

import type { AccountPin } from '@/services/pinterest-pins'
import cn from 'classnames'
import Image from 'next/image'
import { useEffect } from 'react'
import { FaCheck, FaCircle } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setPinIds, togglePinSelection } from '@/store/slices/pins-slice'
import styles from './styles.module.scss'

type PinsListProps = {
   pins: AccountPin[]
}

const PinsList = ({ pins }: PinsListProps) => {
   const dispatch = useAppDispatch()
   const selectedPinIds = useAppSelector((state) => state.pins.selectedPinIds)

   useEffect(() => {
      dispatch(setPinIds(pins.map((pin) => pin.id)))
   }, [dispatch, pins])

   if (pins.length === 0) {
      return <p className={styles.pins__empty}>No Pinterest pins yet.</p>
   }

   return (
      <section className={styles.pins}>
         {pins.map((pin) => {
            const isSelected = selectedPinIds.includes(pin.id)

            return (
               <button
                  key={pin.id}
                  type="button"
                  onClick={() => dispatch(togglePinSelection(pin.id))}
                  className={cn(styles.pin, {
                     [styles['pin--selected']]: isSelected,
                  })}
               >
                  <span className={styles['pin__selected-icon']}>
                     <FaCircle className={styles['pin__selected-icon-bg']} />
                     <FaCheck className={styles['pin__selected-icon-check']} />
                  </span>
                  <div className={styles['pin__image-wrap']}>
                     {pin.imageUrl ? (
                        <Image
                           fill={true}
                           src={pin.imageUrl}
                           alt={`Pinterest pin ${pin.id}`}
                           className={styles['pin__image']}
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                     ) : (
                        <div className={styles['pin__placeholder']}>No image</div>
                     )}
                  </div>
               </button>
            )
         })}
      </section>
   )
}

export default PinsList
