import cn from 'classnames'
import { FaAngleLeft, FaAngleRight, FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa6'
import { TbReload } from 'react-icons/tb'
import styles from './styles.module.scss'
import { IconType } from 'react-icons/lib'

type ControlBarButtonVariant = 'prev' | 'next' | 'play' | 'pause' | 'reset'

interface ControlBarProps {
   variant?: ControlBarButtonVariant
   onClick?: () => void
   className?: string
   disabled?: boolean
   isImageSliderFinished: boolean
}

const iconByVariant: Record<ControlBarButtonVariant, IconType> = {
   prev: FaAngleLeft,
   next: FaAngleRight,
   play: FaPlay,
   pause: FaPause,
   reset: TbReload,
}

const ControlBarButton = ({
   variant = 'next',
   onClick,
   className,
   disabled,
   isImageSliderFinished,
}: ControlBarProps) => {
   const isInactive = disabled && !isImageSliderFinished
   const Icon = iconByVariant[variant]

   return (
      <button
         onClick={onClick}
         className={cn(styles['control-bar-button'], className, {
            [styles['control-bar-button--inactive']]: isInactive,
         })}
         disabled={disabled}
         type="button"
      >
         <Icon
            className={cn(
               styles['control-bar-button__icon'],
               styles[`control-bar-button__icon--${variant}`],
            )}
         />
      </button>
   )
}

export default ControlBarButton
