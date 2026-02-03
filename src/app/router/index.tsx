import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes'

export default function AppRouter() {
   return (
      <Router>
         <AppRoutes />
      </Router>
   )
}
