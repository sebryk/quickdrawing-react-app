import Layout from '@/components/layout'
import { getSessionUser } from '@/services/auth'
import Home from './home/home'

const HomePage = async () => {
   const session = await getSessionUser()
   const userSlug = session ? encodeURIComponent(session.user) : null
   const userLabel = session ? decodeURIComponent(session.user) : null

   return (
      <Layout>
         <Home userSlug={userSlug} />
      </Layout>
   )
}

export default HomePage
