import { Outlet } from 'react-router-dom'
import Header from '../header'
import Footer from '../footer'
import styles from './styles.module.scss'

function Layout() {
   return (
      <div className={styles['app']}>
         <Header />
         <main className={styles['app__content']}>
            <Outlet />
         </main>
         <Footer />
      </div>
   )
}

export default Layout
