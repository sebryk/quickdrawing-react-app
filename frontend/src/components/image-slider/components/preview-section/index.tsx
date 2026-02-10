import cn from 'classnames'
import { PreviewSectionProps } from '../../types'
import styles from './styles.module.scss'

export const PreviewSection = ({
   dataLength,
   isMouseMoving,
   onMouseOver,
   onMouseOut,
   children,
}: PreviewSectionProps) => {
   const getGridTemplateRows = (length: number) => {
      if (length > 39) return 'repeat(4, 1fr)'
      if (length > 26) return 'repeat(3, 1fr)'
      if (length > 13) return 'repeat(2, 1fr)'
      return ''
   }

   return (
      <div
         className={cn(styles['preview-section'], {
            [styles['preview-section--hidden']]: !isMouseMoving,
         })}
         style={{
            gridTemplateRows: getGridTemplateRows(dataLength),
         }}
         onMouseOver={onMouseOver}
         onMouseOut={onMouseOut}
      >
         {children}
      </div>
   )
}
