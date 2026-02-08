import { useEffect } from 'react'
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setTimerSeconds } from '@/store/slices/timer-slice'

const Timer = () => {
   const dispatch = useAppDispatch()
   const timer = useAppSelector((state) => state.timer)
   const selectedOptions = useAppSelector((state) => state.selectedOptions)

   useEffect(() => {
      let intervalId: ReturnType<typeof setInterval> | null = null
      if (timer.isActive) {
         intervalId = setInterval(() => {
            dispatch(setTimerSeconds(timer.seconds + 1))
         }, 1000)
      } else if (!timer.isActive && timer.seconds !== 0 && intervalId) {
         clearInterval(intervalId)
      }
      return () => {
         if (intervalId) clearInterval(intervalId)
      }
   }, [timer.isActive, timer.seconds])

   const minutes = Math.floor(timer.seconds / 60)
   const displaySeconds = timer.seconds % 60
   const displayTime = `${minutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`
   const displayInterval = `${Number(selectedOptions.duration?.value) / 60}:00`

   return (
      <>
         <div className={styles.timer}>{displayTime}</div>
         <div className={styles.interval}>/ {displayInterval}</div>
      </>
   )
}

export default Timer
