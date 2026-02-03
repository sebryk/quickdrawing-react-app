import { RxCross2 } from 'react-icons/rx'
import cn from 'classnames'
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
   goToNextImage,
   goToPrevImage,
   setIsLoading,
   setMouseOut,
   setMouseOver,
} from '../../store/slices/image-slider-slice'
import { showModal } from '@/features/modal/modalSlice'
import Loader from '../../components/Loader/Loader'
import ControllBarButton from '../../components/ui/buttons/controll-bar-button'
import { toggleTimer } from '@/features/timer/timerSlice'
import { FaPlay } from 'react-icons/fa'
import { useContext } from 'react'
import { DataContext } from '../../context/context'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import { NavigationButton } from './components/navigation-button'
import { PreviewSection } from './components/preview-section'
import { PreviewDots } from './components/preview-dots'
import { PreviewImages } from './components/preview-images'
import { Footer } from './components/footer'

const ImageSlider = () => {
   const dispatch = useAppDispatch()
   const imageSlider = useAppSelector((state) => state.imageSlider)
   const timer = useAppSelector((state) => state.timer)
   const imgDataContext = useContext(DataContext)

   if (!imgDataContext) {
      return <ErrorBoundary>Error: The context data is unavailable</ErrorBoundary>
   }

   const { data: imgData } = imgDataContext
   const dataLength = imgData?.length || 0

   const handleMouseOver = () => dispatch(setMouseOver())
   const handleMouseOut = () => dispatch(setMouseOut())

   return (
      <div className={styles['image-slider']}>
         <div
            className={styles['image-slider__btn-wrapper']}
            onClick={() => dispatch(toggleTimer())}
         >
            {timer.isPaused && !imageSlider.isLoading && imageSlider.isMouseMoving && (
               <ControllBarButton
                  className={styles['image-slider__btn']}
                  isImageSliderFinished={imageSlider.isFinished}
               >
                  <FaPlay
                     className={cn(
                        styles['image-slider__btn-icon'],
                        styles['image-slider__btn-icon--play'],
                     )}
                  />
               </ControllBarButton>
            )}
         </div>

         <button
            className={cn(styles['image-slider__close'], {
               [styles['image-slider__close--hidden']]: !imageSlider.isMouseMoving,
            })}
            onClick={() => dispatch(showModal())}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            aria-label="Close image slider"
         >
            <RxCross2
               style={{ backgroundColor: 'rgb(25, 25, 25)' }}
               className={styles['image-slider__close-icon']}
            />
         </button>

         <Loader />

         <img
            title="img"
            className={styles['image-slider__img']}
            onLoad={() => setTimeout(() => dispatch(setIsLoading(false)), 300)}
            src={imgData?.[imageSlider.currentIndex]?.urls?.regular}
            alt={imgData?.[imageSlider.currentIndex]?.alt_description}
         />

         <NavigationButton
            direction="left"
            onClick={() => dispatch(goToPrevImage())}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            isDisabled={imageSlider.currentIndex === 0 || !imageSlider.isFinished}
            isVisible={imageSlider.isFinished}
            isMouseMoving={imageSlider.isMouseMoving}
         />
         <NavigationButton
            direction="right"
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
