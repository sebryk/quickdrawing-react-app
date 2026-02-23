'use client'

import cn from 'classnames'

import ControlBar from '@/components/control-bar'
import CompletionBar from '@/components/image-slider/components/footer/components/completion-bar'
import { useAppDispatch } from '@/store/hooks'
import { showModal } from '@/store/slices/modal-slice'
import { data as footerData } from '../../data'
// import Tooltip from '@/components/ui/tooltip'
// import { truncateText } from '@/utils/truncateText'
import { FooterProps } from '../../types'
import styles from './styles.module.scss'

export const Footer = ({
   data,
   // currentIndex,
   isMouseMoving,
   onMouseOver,
   onMouseOut,
}: FooterProps) => {
   const dispatch = useAppDispatch()
   // const currentImage = data?.[currentIndex]
   const { logo } = footerData
   // const rawAuthorName = currentImage?.title ?? ''

   return (
      <div
         onMouseOut={onMouseOut}
         onMouseOver={onMouseOver}
         className={cn(styles['slider-footer'], {
            [styles['slider-footer--hidden']]: !isMouseMoving,
         })}
      >
         <CompletionBar />
         <div
            onClick={() => dispatch(showModal())}
            className={cn(styles['slider-footer__logo'], 'logo')}
         >
            {logo}
         </div>
         <ControlBar data={data} />
         <h2 className={styles['slider-footer__credit']}>
            {/* {author}&ensp;
            {currentImage && rawAuthorName && (
               <Tooltip content={rawAuthorName} disabled={rawAuthorName.length <= 12}>
                  <a
                     href={currentImage.link ?? ''}
                     className={styles['slider-footer__credit-name']}
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     {truncateText(rawAuthorName, { limit: 12 })}
                  </a>
               </Tooltip>
            )} */}
         </h2>
      </div>
   )
}
