import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.scss'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store/store'
import LoadingBar from './components/loading-bar/loading-bar'
import AppRouter from './app/router'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
   <StrictMode>
      <PersistGate persistor={persistor} loading={<LoadingBar />}>
         <Provider store={store}>
            <AppRouter />
         </Provider>
      </PersistGate>
   </StrictMode>,
)
