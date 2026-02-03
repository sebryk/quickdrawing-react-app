import cn from 'classnames'
import { useAppDispatch } from '@/store/hooks'
import { showModal } from '@/features/modal/modalSlice'
import CompletionBar from '@/features/completionBar/CompletionBar'
import ControlBar from '@/components/control-bar'
import { shortenAuthorsName } from '@/utils/shortenAuthorsName'
import { FooterProps } from '../../types'
import styles from './styles.module.scss'

export const Footer = ({ imgData, currentIndex, isMouseMoving, onMouseOver, onMouseOut }: FooterProps) => {
   const dispatch = useAppDispatch()
   const currentImage = imgData?.[currentIndex]

   return (
      <div
         className={cn(styles['slider-footer'], {
            [styles['slider-footer--hidden']]: !isMouseMoving,
         })}
         onMouseOver={onMouseOver}
         onMouseOut={onMouseOut}
      >
         <CompletionBar />
         <div className={cn(styles['slider-footer__logo'], 'logo')} onClick={() => dispatch(showModal())}>
            QUICKDRAWING
         </div>
         <ControlBar />
         <h2 className={styles['slider-footer__credit']}>
            Author:&ensp;
            {currentImage && (
               <a
                  href={currentImage.user.links.html}
                  className={styles['slider-footer__credit-name']}
                  target="_blank"
               >
                  {shortenAuthorsName(currentImage)}
               </a>
            )}
         </h2>
      </div>
   )
}
