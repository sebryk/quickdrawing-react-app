'use client'

import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
   goToNextImage,
   goToPrevImage,
   setIsLoading,
   setMouseOut,
   setMouseOver,
} from '../../store/slices/image-slider-slice'
import { showModal } from '@/store/slices/modal-slice'
import ControllBarButton from '../control-bar/components/controll-bar-button'
import { toggleTimer } from '@/store/slices/timer-slice'
import { useContext } from 'react'
import { DataContext } from '../../context/context'
import Error from '../error/error'
import { NavigationButton } from './components/navigation-button'
import { PreviewSection } from './components/preview-section'
import { PreviewDots } from './components/preview-section/components/preview-dots'
import { PreviewImages } from './components/preview-section/components/preview-images'
import { Footer } from './components/footer'

const ImageSlider = () => {
   const dispatch = useAppDispatch()
   const imageSlider = useAppSelector((state) => state.imageSlider)
   const timer = useAppSelector((state) => state.timer)
   const imgDataContext = useContext(DataContext)

   if (!imgDataContext) {
      return <Error>Error: The context data is unavailable</Error>
   }

   const { data: imgData } = imgDataContext
   const dataLength = imgData?.length || 0

   const handleMouseOver = () => dispatch(setMouseOver())
   const handleMouseOut = () => dispatch(setMouseOut())

   return (
      <div className={styles['image-slider']}>
         <div
            className={styles['image-slider__button-wrapper']}
            onClick={() => dispatch(toggleTimer())}
         >
            {timer.isPaused && imageSlider.isMouseMoving && (
               <ControllBarButton
                  className={styles['image-slider__button']}
                  isImageSliderFinished={imageSlider.isFinished}
                  variant="play"
               />
            )}
         </div>

         <NavigationButton
            variant="close"
            onClick={() => dispatch(showModal())}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            isMouseMoving={imageSlider.isMouseMoving}
         />

         <img
            title="img"
            className={styles['image-slider__img']}
            onLoad={() => setTimeout(() => dispatch(setIsLoading(false)), 300)}
            src={imgData?.[imageSlider.currentIndex]?.urls?.regular}
            alt={imgData?.[imageSlider.currentIndex]?.alt_description}
         />

         <NavigationButton
            variant="left"
            onClick={() => dispatch(goToPrevImage())}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            isDisabled={imageSlider.currentIndex === 0 || !imageSlider.isFinished}
            isVisible={imageSlider.isFinished}
            isMouseMoving={imageSlider.isMouseMoving}
         />
         <NavigationButton
            variant="right"
            onClick={() => dispatch(goToNextImage())}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            isDisabled={imageSlider.currentIndex === dataLength - 1 || !imageSlider.isFinished}
            isVisible={imageSlider.isFinished}
            isMouseMoving={imageSlider.isMouseMoving}
         />

         <PreviewSection
            dataLength={dataLength}
            isMouseMoving={imageSlider.isMouseMoving}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
         >
            <PreviewDots
               imgData={imgData}
               currentIndex={imageSlider.currentIndex}
               isMouseMoving={imageSlider.isMouseMoving}
            />
            <PreviewImages
               imgData={imgData}
               currentIndex={imageSlider.currentIndex}
               progressIndex={imageSlider.progressIndex}
               isFinished={imageSlider.isFinished}
               isLoading={imageSlider.isLoading}
            />
         </PreviewSection>

         <Footer
            imgData={imgData}
            currentIndex={imageSlider.currentIndex}
            isMouseMoving={imageSlider.isMouseMoving}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
         />
      </div>
   )
}

export default ImageSlider
