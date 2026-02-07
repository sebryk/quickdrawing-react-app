import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

export interface InputProps {
   className: string
   name: string
   placeholder?: string
   type?: InputHTMLAttributes<HTMLInputElement>['type']
   inputProps?: InputHTMLAttributes<HTMLInputElement>
   textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>
}
