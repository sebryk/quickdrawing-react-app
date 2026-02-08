import { useEffect } from 'react'
import ObjectsForm from '../../components/objects-form'
import { useAppDispatch } from '@/store/hooks'
import { resetSelectedOptions } from '../../store/slices/objects-form-slice'
import { persistor } from '../../store/store'
import { data } from './data'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { VscChevronRight } from 'react-icons/vsc'
import PlayerImage from '@/assets/images/player.jpg'

const Home = () => {
   const dispatch = useAppDispatch()

   const { title, description, link } = data

   useEffect(() => {
      dispatch(resetSelectedOptions())
      persistor.purge()
   }, [])

   return (
      <section className={styles['home']}>
         <h1 className={styles['home__title']}>{title}</h1>
         <span className={styles['home__description']}>
            <p className={styles['home__description-text']}>{description}</p>
            <Link to={link.url} className={styles['home__description-link']}>
               {link.title}
               <VscChevronRight className={styles['home__description-icon']} />
            </Link>
         </span>
         <div className={styles['home__content']}>
            <ObjectsForm />
            <img src={PlayerImage} alt="home" className={styles['home__image']} />
         </div>
      </section>
   )
}

export default Home
