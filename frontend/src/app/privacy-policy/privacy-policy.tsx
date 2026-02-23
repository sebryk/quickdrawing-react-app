import { data } from './data'
import styles from './styles.module.scss'

const PrivacyPolicy = () => {
   return (
      <section className={styles.policy}>
         <article className={styles['policy__article']}>
            <h1 className={styles['policy__article-title']}>{data.title}</h1>
            {data.sections.map((section, index) => (
               <p key={index} className={styles['policy__article-text']}>
                  {section}
               </p>
            ))}
         </article>
      </section>
   )
}

export default PrivacyPolicy
