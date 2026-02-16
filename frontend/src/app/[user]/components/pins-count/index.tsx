import MainButton from '@/components/ui/buttons/main-button'
import styles from './styles.module.scss'

type PinsCountProps = {
   value: number
}

const PinsCount = ({ value }: PinsCountProps) => (
   <div className={styles.wrapper}>
      <div className={styles['pins-count']}>
         <span className={styles['pins-count__value']}>{value}</span>
         <span className={styles['pins-count__label']}>Selected</span>
      </div>
      <MainButton href="/drawing" className={styles['start-button']}>
         Start drawing
      </MainButton>
   </div>
)

export default PinsCount
