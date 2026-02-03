import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { showModal } from '../modal/modalSlice'
import { resetSelectedOptions } from '../objectsForm/objectsFormSlice'
import {
   goToImage,
   goToNextImage,
   goToPrevImage,
   resetImageSlider,
} from '@/store/slices/image-slider-slice'

interface initialState {
   seconds: number
   isActive: boolean
   isPaused: boolean
}

const initialState: initialState = {
   seconds: 0,
   isActive: false,
   isPaused: true,
}

const reset = (state: initialState) => {
   state.seconds = 0
}

const timerSlice = createSlice({
   name: 'timer',
   initialState,
   reducers: {
      setTimerSeconds: (state, action: PayloadAction<number>) => {
         state.seconds = action.payload
      },
      setTimerActive: (state, action: PayloadAction<boolean>) => {
         state.isActive = action.payload
         state.isPaused = !action.payload
      },
      setTimerPause: (state, action: PayloadAction<boolean>) => {
         state.isPaused = action.payload
         state.isActive = !action.payload
      },
      toggleTimer: (state) => {
         if (!state.isActive) {
            state.seconds += 1
            state.isActive = true
            state.isPaused = false
         } else {
            state.isActive = false
            state.isPaused = true
         }
      },
      resetTime: reset,
   },
   extraReducers: (builder) => {
      builder.addCase(showModal, (state) => {
         if (state.isActive) {
            state.isActive = !state.isActive
            state.isPaused = !state.isPaused
         }
      })
      builder.addCase(resetSelectedOptions, (state) => (state = initialState))
      builder.addCase(goToNextImage, reset)
      builder.addCase(goToPrevImage, reset)
      builder.addCase(goToImage, reset)
      builder.addCase(resetImageSlider, reset)
   },
})

export const { setTimerSeconds, setTimerActive, setTimerPause, toggleTimer, resetTime } =
   timerSlice.actions
export default timerSlice.reducer
