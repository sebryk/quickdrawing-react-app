import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import { data } from './data'

interface ErrorProps {
   children: ReactNode
}

const Error = ({ children }: ErrorProps) => {
   return (
      <div className={styles.root}>
         <h1 className={styles.title}>{children}</h1>
         <p className={styles.text}>
            {data.retryText}{' '}
            <Link to="/contact" className={styles.link}>
               {data.contactText}
            </Link>
         </p>
         <p className={styles.text}>
            {data.backToText}{' '}
            <Link to="/" className={styles.link}>
               {data.homeText}
            </Link>
         </p>
      </div>
   )
}

export default Error
