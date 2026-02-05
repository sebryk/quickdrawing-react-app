import { IImage } from '../../services/types'

export interface PreviewImagesProps {
   imgData: IImage[]
   currentIndex: number
   progressIndex: number
   isFinished: boolean
   isLoading?: boolean
}

export interface PreviewDotsProps {
   imgData: IImage[]
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
   imgData: IImage[]
   currentIndex: number
   isMouseMoving: boolean
   onMouseOver: () => void
   onMouseOut: () => void
}
