import cn from 'classnames'
import { PreviewDotsProps } from '../../../../types'
import styles from './styles.module.scss'

export const PreviewDots = ({ data, currentIndex, isMouseMoving }: PreviewDotsProps) => {
   const getDotsClassName = (dotIndex: number) => {
      const isActive = dotIndex === currentIndex

      return cn(styles['preview-dots__dot'], {
         [styles['preview-dots__dot--active']]: isActive,
      })
   }

   return (
      <div
         className={cn(styles['preview-dots'], {
            [styles['preview-dots--raised']]: isMouseMoving,
            [styles['preview-dots--visible']]: !isMouseMoving,
         })}
      >
         {data?.map((dot, dotIndex) => (
            <div key={dot.id} className={getDotsClassName(dotIndex)} />
         ))}
      </div>
   )
}
