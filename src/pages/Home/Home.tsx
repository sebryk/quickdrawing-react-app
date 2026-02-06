import { useEffect } from 'react'
import ObjectsForm from '../../components/objects-form'
import { useAppDispatch } from '@/store/hooks'
import { resetSelectedOptions } from '../../store/slices/objects-form-slice'
import { persistor } from '../../store/store'
import { data } from './data'
import styles from './styles.module.scss'

const Home = () => {
   const dispatch = useAppDispatch()

   const { title, description } = data

   useEffect(() => {
      dispatch(resetSelectedOptions())
      persistor.purge()
   }, [])

   return (
      <section className={styles['home']}>
         <h1 className={styles['home__title']}>{title}</h1>
         <p className={styles['home__description']}>{description}</p>
         <ObjectsForm className={styles['home__objects-form']} />
      </section>
   )
}

export default Home
