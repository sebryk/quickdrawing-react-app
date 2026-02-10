'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { VscChevronRight } from 'react-icons/vsc'
import ObjectsForm from '@/components/objects-form'
import { useAppDispatch } from '@/store/hooks'
import { resetSelectedOptions } from '@/store/slices/objects-form-slice'
import { persistor } from '@/store/store'
import PlayerImage from '../../../public/assets/images/player.webp'

import { data } from './data'
import StartupCard from './components/startup-card/startup-card'
import styles from './styles.module.scss'

const Home = () => {
   const { title, description, link } = data

   const dispatch = useAppDispatch()
   const [showForm, setShowForm] = useState(false)

   useEffect(() => {
      dispatch(resetSelectedOptions())
      persistor.purge()
   }, [])

   return (
      <section className={styles['home']}>
         <h1 className={styles['home__title']}>{title}</h1>
         <span className={styles['home__description']}>
            <p className={styles['home__description-text']}>{description}</p>
            <Link href={link.url} className={styles['home__description-link']}>
               {link.title}
               <VscChevronRight className={styles['home__description-icon']} />
            </Link>
         </span>
         <div className={styles['home__content']}>
            {showForm && <ObjectsForm />}
            <Image
               src={PlayerImage}
               alt="home"
               className={styles['home__image']}
               width={530}
               height={294}
               priority
            />
         </div>
         {!showForm && <StartupCard onQuickSession={() => setShowForm(true)} />}
      </section>
   )
}

export default Home
