import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AccountPin } from '@/services/pinterest-pins'

export interface PinState {
   pins: AccountPin[]
   selectedPins: AccountPin[]
   selectedBoardId: string | null
}

type SelectBoardPayload = {
   boardId: string
   pins: AccountPin[]
}

const initialState: PinState = {
   pins: [],
   selectedPins: [],
   selectedBoardId: null,
}

const pinsSlice = createSlice({
   name: 'pins',
   initialState,
   reducers: {
      setPins: (state, action: PayloadAction<AccountPin[]>) => {
         state.pins = action.payload
         const availablePinIds = new Set(action.payload.map((pin) => pin.id))
         if (state.selectedBoardId && !availablePinIds.has(state.selectedBoardId)) {
            state.selectedPins = []
            state.selectedBoardId = null
         }
      },
      toggleBoardSelection: (state, action: PayloadAction<SelectBoardPayload>) => {
         const { boardId, pins } = action.payload
         const boardExists = state.pins.some((statePin) => statePin.id === boardId)
         if (!boardExists) {
            return
         }

         if (state.selectedBoardId === boardId) {
            state.selectedPins = []
            state.selectedBoardId = null
            return
         }

         state.selectedPins = pins
         state.selectedBoardId = boardId
      },
      resetPinSelection: (state) => {
         state.selectedPins = []
         state.selectedBoardId = null
      },
   },
})

export const { setPins, toggleBoardSelection, resetPinSelection } = pinsSlice.actions
export default pinsSlice.reducer
