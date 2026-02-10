import Link from 'next/link'
import { data } from './data'
import styles from './styles.module.scss'

const About = () => {
   return (
      <section className={styles.about}>
         <article className={styles['about__article']}>
            <h1 className={styles['about__article-title']}>{data.title}</h1>
            <p className={styles['about__article-text']}>{data.description}</p>
            <p className={styles['about__article-text']}>
               {data.privacyLink.prefix}{' '}
               <Link href={data.privacyLink.url}>{data.privacyLink.label}</Link>
            </p>
         </article>
      </section>
   )
}

export default About
