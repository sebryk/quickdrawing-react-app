import { useEffect } from 'react'
import Form from '../../components/objects-form'
import { useAppDispatch } from '@/store/hooks'
import { resetSelectedOptions } from '../../components/objects-form/objectsFormSlice'
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
      <section className={styles['main']}>
         <h1 className={styles['main__title']}>{title}</h1>
         <p className={styles['main__description']}>{description}</p>
         <Form className={styles['main__form']} />
      </section>
   )
}

export default Home
