'use client'

import cn from 'classnames'
import { useEffect } from 'react'
import { AccountPin } from '@/services/pinterest-pins'
import {
   goToNextImage,
   goToPrevImage,
   resetImageSlider,
   setIsFinished,
   setProgressIndex,
} from '@/store/slices/image-slider-slice'
import { showModal } from '@/store/slices/modal-slice'
import { toggleTimer } from '@/store/slices/timer-slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setCompletionBar } from '../../store/slices/completion-bar-slice'
import Timer from '../timer'
import ControllBarButton from './components/controll-bar-button'
import styles from './styles.module.scss'

const ControlBar = ({ data }: { data: AccountPin[] }) => {
   const timer = useAppSelector((state) => state.timer)
   const imageSlider = useAppSelector((state) => state.imageSlider)
   const completionBar = useAppSelector((state) => state.completionBar)
   const selectedOptions = useAppSelector((state) => state.selectedOptions)
   const dispatch = useAppDispatch()

   // const { data: imgData, refetch } = imgDataContext

   useEffect(() => {
      const durationValue = Number(selectedOptions.duration?.value)
      if (!durationValue) return

      const percentOfTime = Number(((timer.seconds / durationValue) * 100).toFixed(2))
      dispatch(setCompletionBar(percentOfTime))

      const isTimerComplete = completionBar.completedPercentOfTime === 100
      if (!isTimerComplete) return

      const isLastImage = imageSlider.currentIndex === (data?.length ?? 0) - 1

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
      data?.length,
      selectedOptions.duration?.value,
      timer.seconds,
   ])

   const resetSession = () => {
      dispatch(resetImageSlider())
      // refetch()
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
                  onClick={() => dispatch(toggleTimer())}
                  variant={timer.isActive ? 'pause' : 'play'}
                  isImageSliderFinished={imageSlider.isFinished}
               />
               <ControllBarButton
                  variant="next"
                  onClick={() => dispatch(goToNextImage())}
                  isImageSliderFinished={imageSlider.isFinished}
                  disabled={
                     imageSlider.currentIndex === data?.length - 1 ||
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
