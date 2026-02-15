'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { VscChevronRight } from 'react-icons/vsc'
import ObjectsForm from '@/components/objects-form'
import { useAppDispatch } from '@/store/hooks'
import { resetSelectedOptions } from '@/store/slices/objects-form-slice'
import { persistor } from '@/store/store'
import PlayerImage from '../../../public/assets/images/player.webp'
import StartupCard from './components/startup-card/startup-card'
import { data } from './data'
import styles from './styles.module.scss'

type HomeProps = {
   userSlug: string | null
}

const Home = ({ userSlug }: HomeProps) => {
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
               alt="home"
               width={530}
               height={294}
               priority={true}
               src={PlayerImage}
               className={styles['home__image']}
            />
         </div>
         {!showForm && <StartupCard userSlug={userSlug} onQuickSession={() => setShowForm(true)} />}
      </section>
   )
}

export default Home
