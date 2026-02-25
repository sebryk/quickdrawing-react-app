import cn from 'classnames'

import { PreviewSectionProps } from '../../types'
import styles from './styles.module.scss'

export const PreviewSection = ({
   isMouseMoving,
   onMouseOver,
   onMouseOut,
   children,
}: PreviewSectionProps) => {
   return (
      <div
         onMouseOut={onMouseOut}
         onMouseOver={onMouseOver}
         className={cn(styles['preview-section'], {
            [styles['preview-section--hidden']]: !isMouseMoving,
         })}
      >
         {children}
      </div>
   )
}
