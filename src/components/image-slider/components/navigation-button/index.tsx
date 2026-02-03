import cn from 'classnames'
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia'
import { NavigationButtonProps } from '../../types'
import styles from './styles.module.scss'

export const NavigationButton = ({
   direction,
   onClick,
   onMouseOver,
   onMouseOut,
   isDisabled,
   isVisible,
   isMouseMoving,
}: NavigationButtonProps) => (
   <button
      className={cn(styles['slider-navigation'], {
         [styles['slider-navigation--left']]: direction === 'left',
         [styles['slider-navigation--right']]: direction === 'right',
         [styles['slider-navigation--hidden-left']]: direction === 'left' && !isMouseMoving,
         [styles['slider-navigation--hidden-right']]: direction === 'right' && !isMouseMoving,
         [styles['slider-navigation--invisible']]: !isVisible,
      })}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      type="button"
      aria-label={`Go to the ${direction === 'left' ? 'previous' : 'next'} image`}
      disabled={isDisabled}
   >
      {direction === 'left' ? (
         <LiaAngleLeftSolid className={styles['slider-navigation__icon']} />
      ) : (
         <LiaAngleRightSolid className={styles['slider-navigation__icon']} />
      )}
   </button>
)
