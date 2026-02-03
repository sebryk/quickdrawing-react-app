import cn from 'classnames'
import { useEffect, useContext } from 'react'
import ControllBarButton from '../ui/buttons/controll-bar-button'
import Timer from '../../features/timer/Timer'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { toggleTimer } from '../../features/timer/timerSlice'
import { setCompletionBar } from '../../features/completionBar/completionBarSlice'
import {
   goToNextImage,
   goToPrevImage,
   resetImageSlider,
   setIsFinished,
   setProgressIndex,
} from '@/store/slices/image-slider-slice'
import { showModal } from '../../features/modal/modalSlice'
import { DataContext } from '../../context/context'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import styles from './styles.module.scss'

const ControlBar = () => {
   const timer = useAppSelector((state) => state.timer)
   const imageSlider = useAppSelector((state) => state.imageSlider)
   const completionBar = useAppSelector((state) => state.completionBar)
   const selectedOptions = useAppSelector((state) => state.selectedOptions)
   const imgDataContext = useContext(DataContext)
   const dispatch = useAppDispatch()

   if (!imgDataContext) {
      return <ErrorBoundary>Error: The context data is unavailable</ErrorBoundary>
   }
   const { data: imgData, refetch } = imgDataContext

   useEffect(() => {
      const percentOfTime = (
         (timer.seconds / Number(selectedOptions.duration?.value)) *
         100
      ).toFixed(2)
      if (selectedOptions.duration?.value) {
         dispatch(setCompletionBar(Number(percentOfTime)))
      }
      if (
         imageSlider.currentIndex === imgData?.length - 1 &&
         completionBar.completedPercentOfTime === 100
      ) {
         dispatch(toggleTimer())
         dispatch(setIsFinished(true))
         dispatch(showModal())
      } else if (completionBar.completedPercentOfTime === 100) {
         dispatch(setProgressIndex())
         dispatch(goToNextImage())
      }
   }, [timer.seconds])

   const resetSession = () => {
      dispatch(resetImageSlider())
      refetch()
   }

   return (
      <div
         className={cn('image-slider__control-wrapper', styles['control-bar'], {
            [styles['control-bar--floating']]: imageSlider.isMouseMoving,
         })}
      >
         <div className={cn('image-slider__control-panel', styles['control-bar__panel'])}>
            <div className={styles['control-bar__buttons']}>
               <ControllBarButton
                  variant="prev"
                  onClick={() => dispatch(goToPrevImage())}
                  disabled={imageSlider.currentIndex === 0}
                  isImageSliderFinished={imageSlider.isFinished}
               />
               <ControllBarButton
                  variant={timer.isActive ? 'pause' : 'play'}
                  onClick={() => dispatch(toggleTimer())}
                  isImageSliderFinished={imageSlider.isFinished}
               />
               <ControllBarButton
                  variant="next"
                  onClick={() => dispatch(goToNextImage())}
                  isImageSliderFinished={imageSlider.isFinished}
                  disabled={
                     imageSlider.currentIndex === imgData.length - 1 ||
                     (!imageSlider.isFinished &&
                        imageSlider.currentIndex === imageSlider.progressIndex)
                  }
               />
               <ControllBarButton
                  variant="reset"
                  onClick={resetSession}
                  isImageSliderFinished={imageSlider.isFinished}
               />
            </div>
         </div>
         <div
            className={cn(styles['control-bar__timer'], {
               [styles['control-bar__timer--docked']]: !imageSlider.isMouseMoving,
            })}
         >
            <Timer />
         </div>
      </div>
   )
}

export default ControlBar
