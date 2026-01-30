import styles from './styles.module.scss'
import cn from 'classnames'
import { MainButtonProps } from './types'
import VARIANT_PROPS from './variant-props'

const MainButton = ({
   children,
   type = 'button',
   variant = 'primary',
   onClick,
   disabled,
   icon,
   iconPosition = 'right',
   className,
}: MainButtonProps) => {
   const variantProps = VARIANT_PROPS[variant]
   const Icon = icon ?? variantProps.icon
   const resolvedPosition = iconPosition ?? variantProps.iconPosition ?? 'left'

   return (
      <button
         className={cn(styles['main-button'], styles[variant], className)}
         type={type}
         onClick={onClick}
         disabled={disabled}
      >
         {Icon && resolvedPosition === 'left' && <Icon />}
         {children}
         {Icon && resolvedPosition === 'right' && <Icon />}
      </button>
   )
}

export default MainButton
