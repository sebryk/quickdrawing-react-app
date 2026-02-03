import cn from 'classnames'
import { PreviewDotsProps } from '../../types'
import styles from './styles.module.scss'

export const PreviewDots = ({ imgData, currentIndex, isMouseMoving }: PreviewDotsProps) => {
   const getDotsClassName = (dotIndex: number) => {
      const isActive = dotIndex === currentIndex
      const isHidden = dotIndex > currentIndex

      return cn(styles['preview-dots__dot'], {
         [styles['preview-dots__dot--active']]: isActive,
         [styles['preview-dots__dot--hidden']]: isHidden && !isActive,
      })
   }

   return (
      <div
         className={cn(styles['preview-dots'], {
            [styles['preview-dots--raised']]: isMouseMoving,
            [styles['preview-dots--visible']]: !isMouseMoving,
         })}
      >
         {imgData?.map((dot, dotIndex) => (
            <div key={dot.id} className={getDotsClassName(dotIndex)} />
         ))}
      </div>
   )
}
