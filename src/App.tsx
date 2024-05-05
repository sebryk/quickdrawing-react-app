import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Drawing from './pages/Drawing/Drawing'
import Layout from './components/Layout/Layout';
import NotFound from './pages/NotFound/NotFound'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='contact' element={<Contact/>}/>
        </Route>
        <Route path='drawing' element={<Drawing/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App
