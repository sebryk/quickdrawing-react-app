import { configureStore } from '@reduxjs/toolkit'
import objectsFormReducer from '../features/objectsForm/objectsFormSlice'
import contactFormReducer from '../features/contactForm/contactFormSlice'
import modalReducer from '../features/modal/modalSlice'
import timerReducer from '../features/timer/timerSlice'
import completionBarReducer from '../features/completionBar/completionBarSlice'
import imageSliderReducer, { IImageSliderState } from '../features/imageSlider/imageSliderSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import storage from 'redux-persist/lib/storage'
import { imagesApi } from '../services/imagesApi'
import { ISelectedOptions } from '../features/objectsForm/Types'

const objectsPersistConfig = {
  key: 'options',
  storage: storageSession
}

const imageSliderPersistConfig = {
  key: 'imgIndex',
  storage: storageSession,
  whitelist: ['currentIndex']
}

export const store = configureStore({
  reducer: {
    selectedOptions: persistReducer<ISelectedOptions>(objectsPersistConfig, objectsFormReducer),
    contactFormData: contactFormReducer,
    modal: modalReducer,
    timer: timerReducer,
    completionBar: completionBarReducer,
    imageSlider: persistReducer<IImageSliderState>(imageSliderPersistConfig, imageSliderReducer),
    [imagesApi.reducerPath]: imagesApi.reducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/PURGE']
      }
    }).concat(imagesApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)


export default store