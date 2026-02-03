import { Routes, Route } from 'react-router-dom'

import Layout from '@/components/Layout/Layout'
import Home from '@/pages/Home/Home'
import About from '@/pages/About/About'
import Contact from '@/pages/Contact/Contact'
import Drawing from '@/pages/drawing/drawing'
import NotFound from '@/pages/NotFound/NotFound'

export default function AppRoutes() {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
         </Route>

         <Route path="drawing" element={<Drawing />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
   )
}
