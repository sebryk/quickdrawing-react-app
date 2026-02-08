import { ReactNode } from 'react'
import styles from './styles.module.scss'

type TooltipProps = {
   content?: string | null
   disabled?: boolean
   children: ReactNode
}

const Tooltip = ({ content, disabled = false, children }: TooltipProps) => {
   if (!content || disabled) {
      return <>{children}</>
   }

   return (
      <span className={styles.tooltip} role="tooltip">
         {children}
         <span className={styles.tooltip__content}>{content}</span>
      </span>
   )
}

export default Tooltip
