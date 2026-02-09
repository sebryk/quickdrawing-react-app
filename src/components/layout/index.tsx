import Header from '../header'
import Footer from '../footer'
import styles from './styles.module.scss'
import type { ReactNode } from 'react'

interface LayoutProps {
   children: ReactNode
}

function Layout({ children }: LayoutProps) {
   return (
      <div className={styles['app']}>
         <Header />
         <main className={styles['app__content']}>{children}</main>
         <Footer />
      </div>
   )
}

export default Layout
