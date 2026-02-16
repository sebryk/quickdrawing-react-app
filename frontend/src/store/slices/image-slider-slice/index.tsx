import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { closeModal } from '../modal-slice'
import { resetSelectedOptions } from '../objects-form-slice'

export interface ImageSliderState {
   key: number
   isMouseOver: boolean
   isMouseMoving: boolean
   currentIndex: number
   progressIndex: number
   isLoading: boolean
   isFinished: boolean
}

const initialState: ImageSliderState = {
   key: 0,
   isMouseOver: false,
   isMouseMoving: true,
   currentIndex: 0,
   progressIndex: 0,
   isLoading: true,
   isFinished: true,
}

const imageSliderSlice = createSlice({
   name: 'imageSlider',
   initialState,
   reducers: {
      setMouseOver: (state) => {
         state.isMouseOver = true
      },
      setMouseOut: (state) => {
         state.isMouseOver = false
      },
      mouseIsMoving: (state, action: PayloadAction<boolean>) => {
         state.isMouseMoving = action.payload
      },
      updateCurrentIndex: (state, action: PayloadAction<number>) => {
         state.currentIndex = action.payload
      },
      setIsLoading: (state, action: PayloadAction<boolean>) => {
         state.isLoading = action.payload
      },
      setIsFinished: (state, action: PayloadAction<boolean>) => {
         state.isFinished = action.payload
      },
      setProgressIndex: (state) => {
         if (state.currentIndex === state.progressIndex) {
            state.progressIndex += 1
         }
      },
      goToNextImage: (state) => {
         state.isLoading = true
         state.currentIndex = state.currentIndex + 1
      },
      goToPrevImage: (state) => {
         state.isLoading = true
         state.currentIndex = state.currentIndex - 1
      },
      goToImage: (state, action: PayloadAction<number>) => {
         state.isLoading = true
         state.currentIndex = action.payload
      },
      resetImageSlider: (state) => {
         state.isLoading = true
         state.isFinished = false
         state.currentIndex = 0
         state.key = state.key + 1
      },
   },
   extraReducers: (builder) => {
      builder.addCase(resetSelectedOptions, () => initialState)
      builder.addCase(closeModal, (state) => {
         state.isMouseOver = false
      })
   },
})

export const {
   setMouseOver,
   setMouseOut,
   mouseIsMoving,
   updateCurrentIndex,
   goToNextImage,
   goToPrevImage,
   setIsLoading,
   setIsFinished,
   goToImage,
   resetImageSlider,
   setProgressIndex,
} = imageSliderSlice.actions
export default imageSliderSlice.reducer
