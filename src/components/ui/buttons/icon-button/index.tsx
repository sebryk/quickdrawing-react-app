import cn from 'classnames'
import styles from './styles.module.scss'
import VARIANT_PROPS from './variant-props'
import { IconButtonProps } from './types'

const IconButton = ({
   variant = 'close',
   type = 'button',
   onClick,
   disabled,
   icon,
   className,
   ariaLabel,
}: IconButtonProps) => {
   const variantProps = VARIANT_PROPS[variant]
   const Icon = icon ?? variantProps.icon

   return (
      <button
         className={cn(styles['icon-button'], variantProps.className, className)}
         type={type}
         onClick={onClick}
         disabled={disabled}
         aria-label={ariaLabel}
      >
         {Icon && <Icon />}
      </button>
   )
}

export default IconButton
