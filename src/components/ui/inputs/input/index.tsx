import { InputProps } from './types'

const Input = ({ className, name, placeholder, type, inputProps, textareaProps }: InputProps) => {
   return name === 'message' ? (
      <textarea className={className} name={name} placeholder={placeholder} {...textareaProps} />
   ) : (
      <input
         className={className}
         name={name}
         placeholder={placeholder}
         type={type}
         {...inputProps}
      />
   )
}

export default Input
