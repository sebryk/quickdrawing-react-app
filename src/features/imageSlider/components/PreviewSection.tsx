import { PreviewSectionProps } from '../types';

export const PreviewSection = ({
   dataLength,
   isMouseMoving,
   onMouseOver,
   onMouseOut,
   children,
}: PreviewSectionProps) => {
   const getGridTemplateRows = (length: number) => {
      if (length > 39) return 'repeat(4, 1fr)';
      if (length > 26) return 'repeat(3, 1fr)';
      if (length > 13) return 'repeat(2, 1fr)';
      return '';
   };

   return (
      <div
         className="image-slider__preview"
         style={{
            gridTemplateRows: getGridTemplateRows(dataLength),
            bottom: isMouseMoving ? '' : '-88px',
         }}
         onMouseOver={onMouseOver}
         onMouseOut={onMouseOut}
      >
         {children}
      </div>
   );
};
