import type { ReactNode } from 'react'

import Footer from '../footer'
import Header from '../header'
import styles from './styles.module.scss'

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
