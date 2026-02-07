import { useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { resetSelectedOptions } from '../../store/slices/objects-form-slice'
import { persistor } from '../../store/store'
import { data } from './data'
import styles from './styles.module.scss'

const About = () => {
   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(resetSelectedOptions())
      persistor.purge()
   }, [])

   return (
      <section className={styles.about}>
         <article className={styles['about__article']}>
            <h1 className={styles['about__article-title']}>{data.title}</h1>
            <p className={styles['about__article-text']}>{data.description}</p>
         </article>
      </section>
   )
}

export default About
