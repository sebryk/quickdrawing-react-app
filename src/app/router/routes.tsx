import { Routes, Route } from 'react-router-dom'

import Layout from '@/components/layout/index'
import Home from '@/pages/home/home'
import About from '@/pages/about/About'
import Contact from '@/pages/contact/contact'
import Drawing from '@/pages/drawing/drawing'
import NotFound from '@/pages/not-found/not-found'

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
