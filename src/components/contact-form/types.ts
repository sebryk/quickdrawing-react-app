import type { InputHTMLAttributes } from 'react'
import type { RegisterOptions } from 'react-hook-form'

export interface ContactFormValues {
   name: string
   email: string
   message: string
}

type FieldProps = RegisterOptions<ContactFormValues, keyof ContactFormValues>

export interface ContactFormField {
   name: keyof ContactFormValues
   type?: InputHTMLAttributes<HTMLInputElement>['type']
   placeholder: string
   props: FieldProps
}

export interface ContactFormData {
   fields: ContactFormField[]
   button: {
      title: string
   }
   success: string
}
