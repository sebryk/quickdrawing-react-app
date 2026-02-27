'use client'

import { useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { VscChevronRight } from 'react-icons/vsc'

import ObjectsForm from '@/components/objects-form'
import { useAppDispatch } from '@/store/hooks'
import { resetSelectedOptions } from '@/store/slices/objects-form-slice'
import { resetPinSelection } from '@/store/slices/pins-slice'
import { persistor } from '@/store/store'

import PlayerImage from '../../../public/assets/images/player.webp'
import StartupCard from './components/startup-card/startup-card'
import { data } from './data'
import styles from './styles.module.scss'

type HomeProps = {
   userSlug?: string | null
   page?: 'home' | 'quick-session'
}

const Home = ({ userSlug = null, page = 'home' }: HomeProps) => {
   const { title, description, link } = data

   const dispatch = useAppDispatch()
   const router = useRouter()

   useEffect(() => {
      dispatch(resetSelectedOptions())
      persistor.purge()

      return () => {
         dispatch(resetPinSelection())
      }
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
            {page === 'quick-session' && <ObjectsForm />}
            <Image
               alt="home"
               width={530}
               height={294}
               priority={true}
               src={PlayerImage}
               className={styles['home__image']}
            />
         </div>
         {page === 'home' && (
            <StartupCard userSlug={userSlug} onQuickSession={() => router.push('/quick-session')} />
         )}
      </section>
   )
}

export default Home
