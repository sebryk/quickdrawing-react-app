'use client'

import ProgressBar from '@ramonak/react-progress-bar'

import { useAppSelector } from '@/store/hooks'
import styles from './styles.module.scss'

const CompletionBar = () => {
   const completionBar = useAppSelector((state) => state.completionBar)
   return (
      <ProgressBar
         key={completionBar.key}
         className={styles['progress-bar']}
         completed={completionBar.completedPercentOfTime}
         borderRadius="0"
         height="6px"
         bgColor="var(--red-color)"
         baseBgColor="rgba(255, 255, 255, 0.5)"
         isLabelVisible={false}
         transitionTimingFunction={'linear'}
         transitionDuration={completionBar.transitionDuration}
      />
   )
}

export default CompletionBar
