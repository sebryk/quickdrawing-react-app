import { ChangeEvent, FC } from "react"

export interface ITextInputProps{
  className: string
  type: string
  placeholder: string
  name: string
  value: string
  handleChange: (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  requierd: boolean
}

const TextInput: FC<ITextInputProps> = ({placeholder, name, className, type, value, handleChange, requierd}) => {
  return ( 
  <input 
    placeholder={placeholder}
    name={name}
    className={className}
    type={type}
    value={value}
    onChange={handleChange}
    required
  />
   );
}

export default TextInput;