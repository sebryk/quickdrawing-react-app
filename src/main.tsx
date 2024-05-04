import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';
import Skeleton from 'react-loading-skeleton';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <PersistGate 
    loading={
      <div 
        className="skeleton__container"
      >
        <Skeleton 
          baseColor="#202020" 
          highlightColor="#f12354" 
          width='100%'
          height='100%'
          containerClassName="skeleton__animation"
        />
      </div>
    } 
    persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
    </PersistGate>
  </StrictMode> 
);