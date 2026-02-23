import { createSlice } from '@reduxjs/toolkit'

interface Modal {
   isOpen: boolean
}

const initialState: Modal = {
   isOpen: false,
}

export const modalSlice = createSlice({
   name: 'modal',
   initialState,
   reducers: {
      showModal: (state) => {
         state.isOpen = true
      },
      closeModal: (state) => {
         state.isOpen = false
      },
   },
})

export const { showModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
