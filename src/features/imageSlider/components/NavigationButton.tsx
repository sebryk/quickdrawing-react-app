import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import { NavigationButtonProps } from '../types';

export const NavigationButton = ({
   direction,
   onClick,
   onMouseOver,
   onMouseOut,
   isDisabled,
   isVisible,
   isMouseMoving,
}: NavigationButtonProps) => (
   <button
      className={`image-slider__arrow image-slider__arrow--${direction}`}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      type="button"
      aria-label={`Go to the ${direction === 'left' ? 'previous' : 'next'} image`}
      disabled={isDisabled}
      style={{
         [direction]: !isMouseMoving && '-120px',
         visibility: !isVisible ? 'hidden' : 'visible',
      }}
   >
      {direction === 'left' ? (
         <LiaAngleLeftSolid style={{ backgroundColor: 'rgb(25, 25, 25)' }} className="image-slider__arrow-icon" />
      ) : (
         <LiaAngleRightSolid style={{ backgroundColor: 'rgb(25, 25, 25)' }} className="image-slider__arrow-icon" />
      )}
   </button>
);
