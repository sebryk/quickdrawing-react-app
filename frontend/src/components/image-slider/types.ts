import { AccountPin } from '@/services/pinterest-pins'

export interface PreviewImagesProps {
   data: AccountPin[]
   currentIndex: number
   progressIndex: number
   isFinished: boolean
   isLoading?: boolean
}

export interface PreviewDotsProps {
   data: AccountPin[]
   currentIndex: number
   isMouseMoving: boolean
}

export interface PreviewSectionProps {
   dataLength: number
   isMouseMoving: boolean
   onMouseOver: () => void
   onMouseOut: () => void
   children: React.ReactNode
}

export interface NavigationButtonProps {
   variant: 'left' | 'right' | 'close'
   onClick: () => void
   onMouseOver: () => void
   onMouseOut: () => void
   isDisabled?: boolean
   isVisible?: boolean
   isMouseMoving: boolean
}

export interface FooterProps {
   data: AccountPin[]
   currentIndex: number
   isMouseMoving: boolean
   onMouseOver: () => void
   onMouseOut: () => void
}
