import { InputProps } from './types'

const TextInput = ({
   className,
   name,
   placeholder,
   type,
   inputProps,
   textareaProps,
}: InputProps) => {
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

export default TextInput
