import cn from 'classnames'
import Link from 'next/link'
import styles from './styles.module.scss'
import { IconButtonProps } from './types'
import VARIANT_PROPS from './variant-props'

const IconButton = ({
   variant = 'close',
   type = 'button',
   onClick,
   disabled,
   icon,
   className,
   href,
}: IconButtonProps) => {
   const variantProps = VARIANT_PROPS[variant]
   const Icon = icon ?? variantProps.icon
   const commonClassName = cn(styles['icon-button'], variantProps.className, className)

   if (href) {
      return (
         <Link href={href} className={commonClassName}>
            {Icon && <Icon />}
         </Link>
      )
   }

   return (
      <button type={type} onClick={onClick} disabled={disabled} className={commonClassName}>
         {Icon && <Icon />}
      </button>
   )
}

export default IconButton
