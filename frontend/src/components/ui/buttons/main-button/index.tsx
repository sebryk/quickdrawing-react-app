import cn from 'classnames'
import Link from 'next/link'
import styles from './styles.module.scss'
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
   href,
   target,
}: MainButtonProps) => {
   const variantProps = VARIANT_PROPS[variant]
   const Icon = icon ?? variantProps.icon
   const resolvedPosition = iconPosition ?? variantProps.iconPosition ?? 'left'
   const commonClassName = cn(styles['main-button'], variantProps.className, className)
   const content = (
      <>
         {Icon && resolvedPosition === 'left' && <Icon />}
         {children}
         {Icon && resolvedPosition === 'right' && <Icon />}
      </>
   )

   if (href) {
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined
      return (
         <Link
            rel={rel}
            href={href}
            target={target}
            className={cn(commonClassName, { [styles['disabled']]: disabled })}
         >
            {content}
         </Link>
      )
   }

   return (
      <button type={type} onClick={onClick} disabled={disabled} className={commonClassName}>
         {content}
      </button>
   )
}

export default MainButton
