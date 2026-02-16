import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface PinState {
   pinIds: string[]
   selectedPinIds: string[]
}

const initialState: PinState = {
   pinIds: [],
   selectedPinIds: [],
}

const pinsSlice = createSlice({
   name: 'pins',
   initialState,
   reducers: {
      setPinIds: (state, action: PayloadAction<string[]>) => {
         state.pinIds = action.payload
         state.selectedPinIds = state.selectedPinIds.filter((pinId) =>
            action.payload.includes(pinId),
         )
      },
      togglePinSelection: (state, action: PayloadAction<string>) => {
         const pinId = action.payload

         if (!state.pinIds.includes(pinId)) {
            return
         }

         const pinIndex = state.selectedPinIds.indexOf(pinId)
         if (pinIndex >= 0) {
            state.selectedPinIds.splice(pinIndex, 1)
            return
         }

         state.selectedPinIds.push(pinId)
      },
      resetPinSelection: (state) => {
         state.selectedPinIds = []
      },
   },
})

export const { setPinIds, togglePinSelection, resetPinSelection } = pinsSlice.actions
export default pinsSlice.reducer
