import { IconType } from 'react-icons/lib'

type Type = 'submit' | 'reset' | 'button'

export type Variant = 'primary' | 'primary-with-arrow'

export interface VariantProps {
   className: string
   icon?: IconType
   iconPosition?: 'left' | 'right'
}

export interface MainButtonProps {
   children?: string
   variant?: Variant
   type?: Type
   onClick?: () => void
   disabled?: boolean
   icon?: IconType
   iconPosition?: 'left' | 'right'
   className?: string
}
