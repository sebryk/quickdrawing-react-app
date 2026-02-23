'use client'

import cn from 'classnames'
import { AccountPin } from '@/services/pinterest-pins'
import { useAppDispatch } from '@/store/hooks'
import { goToImage } from '@/store/slices/image-slider-slice'
import { PreviewImagesProps } from '../../../../types'
import styles from './styles.module.scss'

export const PreviewImages = ({
   data,
   currentIndex,
   progressIndex,
   isFinished,
}: PreviewImagesProps) => {
   const dispatch = useAppDispatch()

   const getPreviewClassName = (isActive: boolean, imageIndex: number) =>
      cn(styles['preview-images__image'], {
         [styles['preview-images__image--active']]: isActive,
         [styles['preview-images__image--hidden']]:
            imageIndex > progressIndex && !isFinished && !isActive,
      })

   const getBackgroundImage = (image: AccountPin, isActive: boolean, imageIndex: number) => {
      if (isActive) {
         return `url(${image.imageUrl})`
      }
      if (imageIndex <= progressIndex || isFinished) {
         return `linear-gradient(0deg, rgba(127, 127, 127, 0.5) 0%, rgba(127, 127, 127, 0.5) 100%), url(${image.imageUrl})`
      }
      return ''
   }

   const canInteract = (imageIndex: number) => imageIndex <= progressIndex || isFinished

   return (
      <>
         {data?.map((image, imageIndex) => {
            const isActive = imageIndex === currentIndex
            const isInteractive = canInteract(imageIndex)

            return (
               <button
                  type="button"
                  key={image.id}
                  disabled={isActive}
                  aria-label="preview-image"
                  className={getPreviewClassName(isActive, imageIndex)}
                  onClick={() => isInteractive && dispatch(goToImage(imageIndex))}
                  style={{
                     backgroundImage: getBackgroundImage(image, isActive, imageIndex),
                     cursor: isInteractive && !isActive ? 'pointer' : '',
                  }}
               />
            )
         })}
      </>
   )
}
