import { IconType } from 'react-icons/lib'

type Type = 'submit' | 'reset' | 'button'

export type Variant = 'close' | 'logout'

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
   ariaLabel?: string
}
