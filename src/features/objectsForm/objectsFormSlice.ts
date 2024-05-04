import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISelectedOptions } from "./Types";



const initialState: ISelectedOptions | null = {}

export const objectsFormSlice = createSlice({
  name: 'selectedOptions',
  initialState,
  reducers: {
    selectOption: (state, action: PayloadAction<ISelectedOptions | null>) => {
      if(state && action.payload){
        const key = Object.keys(action.payload)[0]
        state[key] = action.payload[key];
      }
    },
    resetSelectedOptions: state => initialState
  }
})

export const { selectOption, resetSelectedOptions } = objectsFormSlice.actions

export default objectsFormSlice.reducer