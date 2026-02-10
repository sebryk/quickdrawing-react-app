import cn from 'classnames'
import type { IconType } from 'react-icons'
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia'
import { RxCross2 } from 'react-icons/rx'
import { NavigationButtonProps } from '../../types'
import styles from './styles.module.scss'

const iconByVariant: Record<NavigationButtonProps['variant'], IconType> = {
   left: LiaAngleLeftSolid,
   right: LiaAngleRightSolid,
   close: RxCross2,
}

export const NavigationButton = ({
   variant,
   onClick,
   onMouseOver,
   onMouseOut,
   isDisabled = false,
   isVisible = true,
   isMouseMoving,
}: NavigationButtonProps) => {
   const Icon = iconByVariant[variant]

   return (
      <button
         className={cn(styles['slider-navigation'], styles[`slider-navigation--${variant}`], {
            [styles[`slider-navigation--hidden-${variant}`]]: !isMouseMoving,
            [styles['slider-navigation--invisible']]: !isVisible,
         })}
         onClick={onClick}
         onMouseOver={onMouseOver}
         onMouseOut={onMouseOut}
         type="button"
         disabled={isDisabled}
      >
         <Icon className={styles['slider-navigation__icon']} />
      </button>
   )
}
