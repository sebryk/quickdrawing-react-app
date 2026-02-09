import ContactForm from '@/components/contact-form/contact-form'

import { data } from './data'
import styles from './styles.module.scss'

const Contact = () => {
   const { title, description } = data

   return (
      <section className={styles['contact']}>
         <div className={styles['contact__container']}>
            <h1 className={styles['contact__title']}>{title}</h1>
            <p className={styles['contact__text']}>{description}</p>
            <ContactForm />
         </div>
      </section>
   )
}

export default Contact
