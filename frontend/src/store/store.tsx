'use client'

import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import { imagesApi } from '../api/imagesApi'
import { ISelectedOptions } from '../components/objects-form/types'
import completionBarReducer from './slices/completion-bar-slice'
import imageSliderReducer, { ImageSliderState } from './slices/image-slider-slice'
import modalReducer from './slices/modal-slice'
import objectsFormReducer from './slices/objects-form-slice'
import pinsReducer from './slices/pins-slice'
import timerReducer from './slices/timer-slice'

const objectsPersistConfig = {
   key: 'options',
   storage: storageSession,
}

const imageSliderPersistConfig = {
   key: 'imgIndex',
   storage: storageSession,
   whitelist: ['currentIndex'],
}

export const store = configureStore({
   reducer: {
      selectedOptions: persistReducer<ISelectedOptions>(objectsPersistConfig, objectsFormReducer),
      modal: modalReducer,
      timer: timerReducer,
      completionBar: completionBarReducer,
      imageSlider: persistReducer<ImageSliderState>(imageSliderPersistConfig, imageSliderReducer),
      pins: pinsReducer,
      [imagesApi.reducerPath]: imagesApi.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/PURGE'],
         },
      }).concat(imagesApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

export default store
