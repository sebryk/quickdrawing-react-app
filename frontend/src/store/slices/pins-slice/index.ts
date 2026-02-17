import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AccountPin } from '@/services/pinterest-pins'

export interface PinState {
   pins: AccountPin[]
   selectedPins: AccountPin[]
}

const initialState: PinState = {
   pins: [],
   selectedPins: [],
}

const pinsSlice = createSlice({
   name: 'pins',
   initialState,
   reducers: {
      setPins: (state, action: PayloadAction<AccountPin[]>) => {
         state.pins = action.payload
         const availablePinIds = new Set(action.payload.map((pin) => pin.id))
         state.selectedPins = state.selectedPins.filter((pin) => availablePinIds.has(pin.id))
      },
      togglePinSelection: (state, action: PayloadAction<AccountPin>) => {
         const pin = action.payload
         const pinExists = state.pins.some((statePin) => statePin.id === pin.id)
         if (!pinExists) {
            return
         }

         const pinIndex = state.selectedPins.findIndex((selectedPin) => selectedPin.id === pin.id)
         if (pinIndex >= 0) {
            state.selectedPins.splice(pinIndex, 1)
            return
         }

         state.selectedPins.push(pin)
      },
      resetPinSelection: (state) => {
         state.selectedPins = []
      },
   },
})

export const { setPins, togglePinSelection, resetPinSelection } = pinsSlice.actions
export default pinsSlice.reducer
