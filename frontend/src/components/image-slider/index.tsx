'use client'

import Image from 'next/image'
import { AccountPin } from '@/services/pinterest-pins'
import { showModal } from '@/store/slices/modal-slice'
import { toggleTimer } from '@/store/slices/timer-slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
   goToNextImage,
   goToPrevImage,
   setMouseOut,
   setMouseOver,
} from '../../store/slices/image-slider-slice'
import ControllBarButton from '../control-bar/components/controll-bar-button'
import { Footer } from './components/footer'
import { NavigationButton } from './components/navigation-button'
import { PreviewSection } from './components/preview-section'
import { PreviewDots } from './components/preview-section/components/preview-dots'
import { PreviewImages } from './components/preview-section/components/preview-images'
import styles from './styles.module.scss'

const ImageSlider = ({ data }: { data: AccountPin[] }) => {
   const dispatch = useAppDispatch()
   const imageSlider = useAppSelector((state) => state.imageSlider)
   const timer = useAppSelector((state) => state.timer)
   const currentImage = data?.[imageSlider.currentIndex]?.imageUrl

   const dataLength = data?.length || 0

   const handleMouseOver = () => dispatch(setMouseOver())
   const handleMouseOut = () => dispatch(setMouseOut())

   return (
      <div className={styles['image-slider']}>
         <div
            tabIndex={0}
            role="button"
            onClick={() => dispatch(toggleTimer())}
            className={styles['image-slider__button-wrapper']}
         >
            {timer.isPaused && imageSlider.isMouseMoving && (
               <ControllBarButton
                  variant="play"
                  className={styles['image-slider__button']}
                  isImageSliderFinished={imageSlider.isFinished}
               />
            )}
         </div>

         <NavigationButton
            variant="close"
            onMouseOut={handleMouseOut}
            onMouseOver={handleMouseOver}
            onClick={() => dispatch(showModal())}
            isMouseMoving={imageSlider.isMouseMoving}
         />
         {currentImage && (
            <Image
               fill={true}
               title="img"
               sizes="100vw"
               quality={100}
               className={styles['image-slider__img']}
               alt={data?.[imageSlider.currentIndex]?.title || ''}
               src={data?.[imageSlider.currentIndex]?.imageUrl || ''}
            />
         )}

         <NavigationButton
            variant="left"
            onMouseOut={handleMouseOut}
            onMouseOver={handleMouseOver}
            isVisible={imageSlider.isFinished}
            onClick={() => dispatch(goToPrevImage())}
            isMouseMoving={imageSlider.isMouseMoving}
            isDisabled={imageSlider.currentIndex === 0 || !imageSlider.isFinished}
         />
         <NavigationButton
            variant="right"
            onMouseOut={handleMouseOut}
            onMouseOver={handleMouseOver}
            isVisible={imageSlider.isFinished}
            onClick={() => dispatch(goToNextImage())}
            isMouseMoving={imageSlider.isMouseMoving}
            isDisabled={imageSlider.currentIndex === dataLength - 1 || !imageSlider.isFinished}
         />

         <PreviewSection
            dataLength={dataLength}
            onMouseOut={handleMouseOut}
            onMouseOver={handleMouseOver}
            isMouseMoving={imageSlider.isMouseMoving}
         >
            <PreviewDots
               data={data}
               currentIndex={imageSlider.currentIndex}
               isMouseMoving={imageSlider.isMouseMoving}
            />
            <PreviewImages
               data={data}
               isLoading={imageSlider.isLoading}
               isFinished={imageSlider.isFinished}
               currentIndex={imageSlider.currentIndex}
               progressIndex={imageSlider.progressIndex}
            />
         </PreviewSection>

         <Footer
            data={data}
            onMouseOut={handleMouseOut}
            onMouseOver={handleMouseOver}
            currentIndex={imageSlider.currentIndex}
            isMouseMoving={imageSlider.isMouseMoving}
         />
      </div>
   )
}

export default ImageSlider
