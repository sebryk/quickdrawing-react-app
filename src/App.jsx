import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Drawing from './pages/Drawing'
import Layout from './components/Layout';

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
      </Routes>
    </HashRouter>
  )
}

export default App
