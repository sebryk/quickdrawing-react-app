'use client'

import cn from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AccountPin } from '@/services/pinterest-pins'
import { useAppDispatch } from '@/store/hooks'
import { goToImage } from '@/store/slices/image-slider-slice'
import { PreviewImagesProps } from '../../../../types'
import styles from './styles.module.scss'

const MAX_VISIBLE_PREVIEW_COUNT = 8
const PREVIEW_SCROLL_STEP = 240

export const PreviewImages = ({
   data,
   currentIndex,
   progressIndex,
   isFinished,
}: PreviewImagesProps) => {
   const dispatch = useAppDispatch()
   const viewportRef = useRef<HTMLDivElement>(null)
   const [canScrollLeft, setCanScrollLeft] = useState(false)
   const [canScrollRight, setCanScrollRight] = useState(false)

   const isSliderEnabled = data.length > MAX_VISIBLE_PREVIEW_COUNT

   const updateArrowState = useCallback(() => {
      if (!viewportRef.current || !isSliderEnabled) {
         setCanScrollLeft(false)
         setCanScrollRight(false)
         return
      }

      const { scrollLeft, scrollWidth, clientWidth } = viewportRef.current
      const maxScrollLeft = scrollWidth - clientWidth

      setCanScrollLeft(scrollLeft > 2)
      setCanScrollRight(scrollLeft < maxScrollLeft - 2)
   }, [isSliderEnabled])

   useEffect(() => {
      updateArrowState()
   }, [data.length, updateArrowState])

   useEffect(() => {
      if (!isSliderEnabled) {
         return
      }

      const activePreview = viewportRef.current?.children[currentIndex] as
         | HTMLButtonElement
         | undefined

      activePreview?.scrollIntoView({
         behavior: 'smooth',
         inline: 'nearest',
         block: 'nearest',
      })
   }, [currentIndex, isSliderEnabled])

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

   const handleScroll = (direction: 'left' | 'right') => {
      if (!viewportRef.current) {
         return
      }

      const nextScrollLeft =
         direction === 'left'
            ? viewportRef.current.scrollLeft - PREVIEW_SCROLL_STEP
            : viewportRef.current.scrollLeft + PREVIEW_SCROLL_STEP

      viewportRef.current.scrollTo({ left: nextScrollLeft, behavior: 'smooth' })
   }

   const renderImages = () =>
      data?.map((image, imageIndex) => {
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
      })

   return (
      <div className={styles['preview-images']}>
         {isSliderEnabled && (
            <button
               type="button"
               aria-label="scroll-previews-left"
               className={styles['preview-images__arrow']}
               onClick={() => handleScroll('left')}
               disabled={!canScrollLeft}
            >
               ‹
            </button>
         )}

         <div
            ref={viewportRef}
            onScroll={updateArrowState}
            className={cn(styles['preview-images__viewport'], {
               [styles['preview-images__viewport--slider']]: isSliderEnabled,
            })}
         >
            {renderImages()}
         </div>

         {isSliderEnabled && (
            <button
               type="button"
               aria-label="scroll-previews-right"
               className={styles['preview-images__arrow']}
               onClick={() => handleScroll('right')}
               disabled={!canScrollRight}
            >
               ›
            </button>
         )}
      </div>
   )
}
