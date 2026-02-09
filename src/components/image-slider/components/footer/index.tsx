'use client'

import cn from 'classnames'

import { useAppDispatch } from '@/store/hooks'
import { showModal } from '@/store/slices/modal-slice'
import CompletionBar from '@/components/image-slider/components/footer/components/completion-bar'
import ControlBar from '@/components/control-bar'
import Tooltip from '@/components/ui/tooltip'
import { truncateText } from '@/utils/truncateText'
import { FooterProps } from '../../types'
import { data } from '../../data'
import styles from './styles.module.scss'

export const Footer = ({
   imgData,
   currentIndex,
   isMouseMoving,
   onMouseOver,
   onMouseOut,
}: FooterProps) => {
   const dispatch = useAppDispatch()
   const currentImage = imgData?.[currentIndex]
   const { logo, author } = data
   const rawAuthorName = currentImage?.user?.name ?? ''

   return (
      <div
         className={cn(styles['slider-footer'], {
            [styles['slider-footer--hidden']]: !isMouseMoving,
         })}
         onMouseOver={onMouseOver}
         onMouseOut={onMouseOut}
      >
         <CompletionBar />
         <div
            className={cn(styles['slider-footer__logo'], 'logo')}
            onClick={() => dispatch(showModal())}
         >
            {logo}
         </div>
         <ControlBar />
         <h2 className={styles['slider-footer__credit']}>
            {author}&ensp;
            {currentImage && rawAuthorName && (
               <Tooltip content={rawAuthorName} disabled={rawAuthorName.length <= 12}>
                  <a
                     href={currentImage.user.links.html}
                     className={styles['slider-footer__credit-name']}
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     {truncateText(rawAuthorName, { limit: 12 })}
                  </a>
               </Tooltip>
            )}
         </h2>
      </div>
   )
}
