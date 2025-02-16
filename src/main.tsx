import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';
import LoadingBar from './components/LoadingBar/LoadingBar';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
   <StrictMode>
      <PersistGate persistor={persistor} loading={<LoadingBar />}>
         <Provider store={store}>
            <App />
         </Provider>
      </PersistGate>
   </StrictMode>,
);
