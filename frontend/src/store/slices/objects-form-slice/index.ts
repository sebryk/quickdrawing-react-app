import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOption, ISelectedOptions } from '../../../components/objects-form/types'

const defaultDurationOption: IOption = { value: 300, label: '5 min' }

const initialState: ISelectedOptions | null = {
   duration: defaultDurationOption,
}

export const objectsFormSlice = createSlice({
   name: 'selectedOptions',
   initialState,
   reducers: {
      selectOption: (state, action: PayloadAction<ISelectedOptions | null>) => {
         if (state && action.payload) {
            const key = Object.keys(action.payload)[0]
            state[key] = action.payload[key]
         }
      },
      resetSelectedOptions: () => initialState,
   },
})

export const { selectOption, resetSelectedOptions } = objectsFormSlice.actions

export default objectsFormSlice.reducer
