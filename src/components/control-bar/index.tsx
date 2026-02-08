import cn from 'classnames'
import { useEffect, useContext } from 'react'
import ControllBarButton from './components/controll-bar-button'
import Timer from '../timer'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { toggleTimer } from '@/store/slices/timer-slice'
import { setCompletionBar } from '../../store/slices/completion-bar-slice/completion-bar-slice'
import {
   goToNextImage,
   goToPrevImage,
   resetImageSlider,
   setIsFinished,
   setProgressIndex,
} from '@/store/slices/image-slider-slice'
import { showModal } from '@/store/slices/modal-slice'
import { DataContext } from '../../context/context'
import Error from '../error/Error'
import styles from './styles.module.scss'

const ControlBar = () => {
   const timer = useAppSelector((state) => state.timer)
   const imageSlider = useAppSelector((state) => state.imageSlider)
   const completionBar = useAppSelector((state) => state.completionBar)
   const selectedOptions = useAppSelector((state) => state.selectedOptions)
   const imgDataContext = useContext(DataContext)
   const dispatch = useAppDispatch()

   if (!imgDataContext) {
      return <Error>Error: The context data is unavailable</Error>
   }
   const { data: imgData, refetch } = imgDataContext

   useEffect(() => {
      const durationValue = Number(selectedOptions.duration?.value)
      if (!durationValue) return

      const percentOfTime = Number(((timer.seconds / durationValue) * 100).toFixed(2))
      dispatch(setCompletionBar(percentOfTime))

      const isTimerComplete = completionBar.completedPercentOfTime === 100
      if (!isTimerComplete) return

      const isLastImage = imageSlider.currentIndex === (imgData?.length ?? 0) - 1

      if (isLastImage) {
         dispatch(toggleTimer())
         dispatch(setIsFinished(true))
         dispatch(showModal())
         return
      }

      dispatch(setProgressIndex())
      dispatch(goToNextImage())
   }, [
      completionBar.completedPercentOfTime,
      imageSlider.currentIndex,
      imgData?.length,
      selectedOptions.duration?.value,
      timer.seconds,
   ])

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
