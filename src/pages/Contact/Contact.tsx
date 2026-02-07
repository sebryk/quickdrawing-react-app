import { useEffect } from 'react'
import { persistor } from '../../store/store'
import { useAppDispatch } from '../../store/hooks'
import { resetSelectedOptions } from '../../store/slices/objects-form-slice'
import ContactForm from '@/features/contact-form/contact-form'
import { data } from './data'
import styles from './styles.module.scss'

const Contact = () => {
   const dispatch = useAppDispatch()
   const { title, description } = data

   useEffect(() => {
      dispatch(resetSelectedOptions())
      persistor.purge()
   }, [])

   return (
      <section className={styles['contact']}>
         <h1 className={styles['contact__title']}>{title}</h1>
         <p className={styles['contact__text']}>{description}</p>
         <ContactForm />
      </section>
   )
}

export default Contact
