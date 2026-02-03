import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"

interface IContactForm {
  [name: string]: string 
}


const initialState: IContactForm = {
  name: '',
  email: '',
  message: '',
} 

const contactFormSlice = createSlice({
  name: 'contactFormData',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IContactForm>) => {
      const {name, value } = action.payload;
      state[name] = value
    },
    clean: (state) => {
      state.name = ''
      state.email = ''
      state.message = ''
    }
  }
})

export const { set, clean } = contactFormSlice.actions

export default contactFormSlice.reducer