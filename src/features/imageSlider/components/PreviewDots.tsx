import { PreviewDotsProps } from '../types';

export const PreviewDots = ({ imgData, currentIndex, isMouseMoving }: PreviewDotsProps) => {
   const getDotsClassName = (dotIndex: number) => {
      const isActive = dotIndex === currentIndex;
      const isHidden = dotIndex > currentIndex;

      return `image-slider__preview-dot ${
         isActive ? 'image-slider__preview-dot--active' : isHidden ? 'image-slider__preview-dot--hidden' : ''
      }`.trim();
   };

   return (
      <div
         className="image-slider__dots-container"
         style={{
            top: isMouseMoving ? '-70px' : '',
            opacity: !isMouseMoving ? '1' : '',
         }}
      >
         {imgData?.map((dot, dotIndex) => <div key={dot.id} className={getDotsClassName(dotIndex)} />)}
      </div>
   );
};
