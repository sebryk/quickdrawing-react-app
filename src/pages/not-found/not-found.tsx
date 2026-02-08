import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { data } from './data'
import styles from './styles.module.scss'

const NotFound = () => {
   const navigate = useNavigate()
   const { title, description, link } = data

   useEffect(() => {
      const timeoutId = setTimeout(() => navigate('/'), 10000)
      return () => clearTimeout(timeoutId)
   }, [navigate])

   return (
      <section className={styles['not-found']}>
         <div className={styles['not-found__container']}>
            <h1 className={styles['not-found__title']}>{title}</h1>
            <p className={styles['not-found__description']}>{description}</p>
            <p className={styles['not-found__text']}>
               {link.prefix}{' '}
               <Link className={styles['not-found__link']} to={link.url}>
                  {link.title}
               </Link>
            </p>
         </div>
      </section>
   )
}

export default NotFound
