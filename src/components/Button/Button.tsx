import { FC } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import './Button.css'

interface ButtonProps {
  children: string
  type?: 'submit' | 'reset' | 'button' | undefined
  className: string
  handleClick?: () => void
  disabled?: boolean
}

const Button: FC<ButtonProps> = ({ children, type, className, handleClick, disabled }) =>  {
  return (  
      <button 
        className={className}
        type={type}
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
        <BiChevronRight 
        className='btn-icon'
        />
      </button>
  );
}

export default Button