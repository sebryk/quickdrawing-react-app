import { useState, FC, ReactNode, CSSProperties } from "react";
import { useAppSelector } from "../../store/hooks";

interface ControlBarProps {
  handleClick?: () => void,
  children: ReactNode
  className: string
  disabled?: boolean
  style?: CSSProperties
}

const ControlBarBtn: FC<ControlBarProps> = ({ children, handleClick, className, disabled }) => {

  const [isHovered, setIsHovered] = useState(false);
  const imageSlider = useAppSelector(state => state.imageSlider)

  return (  
    <button
      style={{
        opacity: disabled && !imageSlider.isFinished ? '0.5' : '1',
        color: isHovered && !disabled ? 'var(--red-color)' : '',
        borderColor: isHovered && !disabled ? 'var(--red-color)' : '',
        cursor: disabled && !imageSlider.isFinished ? 'unset' : ''
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={className}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
}
 
export default ControlBarBtn
