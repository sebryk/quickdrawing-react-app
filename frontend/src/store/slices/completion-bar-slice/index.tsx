import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
   goToNextImage,
   goToPrevImage,
   goToImage,
   resetImageSlider,
} from '@/store/slices/image-slider-slice'
import { resetTime } from '@/store/slices/timer-slice'

interface initialState {
   completedPercentOfTime: number
   key: number
   transitionDuration: string
}

const initialState: initialState = {
   completedPercentOfTime: 0,
   key: 0,
   transitionDuration: '1s',
}

const reset = (state: initialState) => {
   state.key = state.key + 1
   state.completedPercentOfTime = 0
}

const completionBarSlice = createSlice({
   name: 'completionBar',
   initialState,
   reducers: {
      setCompletionBar: (state, action: PayloadAction<number>) => {
         state.completedPercentOfTime = action.payload
      },
      resetCompletionBar: reset,
   },
   extraReducers: (builder) => {
      builder.addCase(resetTime, reset)
      builder.addCase(goToNextImage, reset)
      builder.addCase(goToPrevImage, reset)
      builder.addCase(goToImage, reset)
      builder.addCase(resetImageSlider, reset)
   },
})

export const { setCompletionBar, resetCompletionBar } = completionBarSlice.actions
export default completionBarSlice.reducer
