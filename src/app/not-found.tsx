'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { data } from './not-found/data'
import styles from './not-found/styles.module.scss'

export default function NotFoundPage() {
   const router = useRouter()
   const { title, description, link } = data

   useEffect(() => {
      const timeoutId = setTimeout(() => router.push('/'), 10000)
      return () => clearTimeout(timeoutId)
   }, [router])

   return (
      <section className={styles['not-found']}>
         <div className={styles['not-found__container']}>
            <h1 className={styles['not-found__title']}>{title}</h1>
            <p className={styles['not-found__description']}>{description}</p>
            <p className={styles['not-found__text']}>
               {link.prefix}{' '}
               <Link className={styles['not-found__link']} href={link.url}>
                  {link.title}
               </Link>
            </p>
         </div>
      </section>
   )
}
