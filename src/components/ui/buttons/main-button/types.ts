import { IconType } from 'react-icons/lib'
import type { ReactNode, AnchorHTMLAttributes } from 'react'

type Type = 'submit' | 'reset' | 'button'

export type Variant = 'primary' | 'primary-with-arrow' | 'accent'

export interface VariantProps {
   className: string
   icon?: IconType
   iconPosition?: 'left' | 'right'
}

export interface MainButtonProps {
   children?: ReactNode
   variant?: Variant
   type?: Type
   onClick?: () => void
   disabled?: boolean
   icon?: IconType
   iconPosition?: 'left' | 'right'
   className?: string
   href?: string
   target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
}
