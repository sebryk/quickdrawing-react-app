'use client'

import { useEffect } from 'react'
import Link from 'next/link'
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
   }, [dispatch, persistor])

   return (
      <section className={styles.about}>
         <article className={styles['about__article']}>
            <h1 className={styles['about__article-title']}>{data.title}</h1>
            <p className={styles['about__article-text']}>{data.description}</p>
            <p className={styles['about__article-text']}>
               See our <Link href="/privacy-policy">Privacy Policy</Link>
            </p>
         </article>
      </section>
   )
}

export default About
