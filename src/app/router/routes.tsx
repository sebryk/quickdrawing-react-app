import { Routes, Route } from 'react-router-dom'

import Layout from '@/components/layout/index'
import Home from '@/pages/home/home'
import About from '@/pages/about/about'
import Contact from '@/pages/contact/contact'
import Policy from '@/pages/privacy-policy/privacy-policy'
import Drawing from '@/pages/drawing/drawing'
import NotFound from '@/pages/not-found/not-found'

export default function AppRoutes() {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<Policy />} />
         </Route>

         <Route path="drawing" element={<Drawing />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
   )
}
