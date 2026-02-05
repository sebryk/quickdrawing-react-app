import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './styles.module.scss'

const LoadingBar = () => {
   return (
      <div className={styles['skeleton']}>
         <Skeleton
            baseColor="#202020"
            highlightColor="#f12354"
            width="100%"
            height="100%"
            containerClassName="skeleton__animation"
         />
      </div>
   )
}

export default LoadingBar
