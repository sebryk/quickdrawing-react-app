import { ITextInputProps } from "../TextInput/TextInput";
import { FC } from "react";

type TextAreaProps = Omit<ITextInputProps, 'type'>


const TextArea: FC<TextAreaProps> = ({placeholder, name, className, value, handleChange}) =>{
  return (         
  <textarea
    placeholder={placeholder}
    name={name}
    className={className}
    value={value}
    onChange={handleChange}
  ></textarea>);
}

export default TextArea;