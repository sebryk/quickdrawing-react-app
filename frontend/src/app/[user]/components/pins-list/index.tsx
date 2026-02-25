'use client'

import type { AccountBoardWithPins } from '@/services/pinterest-boards'
import cn from 'classnames'
import Image from 'next/image'
import { useEffect } from 'react'
import { FaCheck, FaCircle } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setPins, toggleBoardSelection } from '@/store/slices/pins-slice'
import styles from './styles.module.scss'

type PinsListProps = {
   boards: AccountBoardWithPins[]
}

const PinsList = ({ boards }: PinsListProps) => {
   const dispatch = useAppDispatch()
   const selectedBoardId = useAppSelector((state) => state.pins.selectedBoardId)

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
            const isSelected = selectedBoardId === board.id
            const previewCount = board.previewPins.length

            return (
               <button
                  key={board.id}
                  type="button"
                  onClick={() => dispatch(toggleBoardSelection({ boardId: board.id, pins: board.pins }))}
                  className={cn(styles.pin, {
                     [styles['pin--selected']]: isSelected,
                  })}
               >
                  <span className={styles['pin__selected-icon']}>
                     <FaCircle className={styles['pin__selected-icon-bg']} />
                     <FaCheck className={styles['pin__selected-icon-check']} />
                  </span>
                  <div
                     className={cn(styles['pin__preview-grid'], {
                        [styles['pin__preview-grid--count-1']]: previewCount === 1,
                        [styles['pin__preview-grid--count-2']]: previewCount === 2,
                        [styles['pin__preview-grid--count-3']]: previewCount === 3,
                     })}
                  >
                     {previewCount > 0 ? (
                        board.previewPins.map((pin, index) => (
                           <div
                              key={pin.id}
                              className={cn(styles['pin__preview-item'], {
                                 [styles['pin__preview-item--third']]: previewCount === 3 && index === 2,
                              })}
                           >
                              {pin.imageUrl ? (
                                 <Image
                                    fill={true}
                                    src={pin.imageUrl}
                                    alt={`Board ${board.name ?? board.id} pin ${pin.id}`}
                                    className={styles['pin__image']}
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                 />
                              ) : (
                                 <div className={styles['pin__placeholder']}>No image</div>
                              )}
                           </div>
                        ))
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
