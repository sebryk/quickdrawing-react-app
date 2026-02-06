import { data } from './data'
import styles from './styles.module.scss'

const Footer = () => {
   const { copyright } = data
   return (
      <footer className={styles.footer}>
         {copyright} {new Date().getFullYear()}
      </footer>
   )
}

export default Footer
