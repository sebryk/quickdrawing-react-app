import { IconType } from 'react-icons/lib'

type Type = 'submit' | 'reset' | 'button'

export type Variant = 'close' | 'logout' | 'back'

export interface VariantProps {
   className: string
   icon?: IconType
}

export interface IconButtonProps {
   variant?: Variant
   type?: Type
   onClick?: () => void
   disabled?: boolean
   icon?: IconType
   className?: string
   href?: string
}
