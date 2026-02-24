'use client'

import type { AccountBoard } from '@/services/pinterest-boards'
import cn from 'classnames'
import Image from 'next/image'
import { useEffect } from 'react'
import { FaCheck, FaCircle } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setPins, togglePinSelection } from '@/store/slices/pins-slice'
import styles from './styles.module.scss'

type PinsListProps = {
   boards: AccountBoard[]
}

const PinsList = ({ boards }: PinsListProps) => {
   const dispatch = useAppDispatch()
   const selectedPins = useAppSelector((state) => state.pins.selectedPins)

   useEffect(() => {
      dispatch(
         setPins(
            boards.map((board) => ({
               id: board.id,
               title: board.name,
               description: board.description,
               link: null,
               createdAt: board.createdAt,
               imageUrl: board.imageUrl,
            })),
         ),
      )
   }, [boards, dispatch])

   if (boards.length === 0) {
      return <p className={styles.pins__empty}>No Pinterest boards yet.</p>
   }

   return (
      <section className={styles.pins}>
         {boards.map((board) => {
            const isSelected = selectedPins.some((selectedPin) => selectedPin.id === board.id)

            return (
               <button
                  key={board.id}
                  type="button"
                  onClick={() =>
                     dispatch(
                        togglePinSelection({
                           id: board.id,
                           title: board.name,
                           description: board.description,
                           link: null,
                           createdAt: board.createdAt,
                           imageUrl: board.imageUrl,
                        }),
                     )
                  }
                  className={cn(styles.pin, {
                     [styles['pin--selected']]: isSelected,
                  })}
               >
                  <span className={styles['pin__selected-icon']}>
                     <FaCircle className={styles['pin__selected-icon-bg']} />
                     <FaCheck className={styles['pin__selected-icon-check']} />
                  </span>
                  <div className={styles['pin__image-wrap']}>
                     {board.imageUrl ? (
                        <Image
                           fill={true}
                           src={board.imageUrl}
                           alt={`Pinterest board ${board.name ?? board.id}`}
                           className={styles['pin__image']}
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                     ) : (
                        <div className={styles['pin__placeholder']}>No preview</div>
                     )}
                  </div>
                  <div className={styles['pin__body']}>
                     <h3 className={styles['pin__title']}>{board.name ?? 'Untitled board'}</h3>
                  </div>
               </button>
            )
         })}
      </section>
   )
}

export default PinsList
