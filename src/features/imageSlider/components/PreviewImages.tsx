import { useAppDispatch } from '../../../store/hooks';
import { goToImage } from '../imageSliderSlice';
import loader from '../../../assets/loader.svg';
import { PreviewImagesProps } from '../types';

export const PreviewImages = ({ imgData, currentIndex, progressIndex, isFinished, isLoading }: PreviewImagesProps) => {
   const dispatch = useAppDispatch();

   const getPreviewClassName = (isActive: boolean, imageIndex: number) => {
      return `image-slider__preview-img ${
         isActive
            ? 'image-slider__preview-img--active'
            : imageIndex > progressIndex && !isFinished
              ? 'image-slider__preview-img--hidden'
              : ''
      }`.trim();
   };

   const getBackgroundImage = (image: any, isActive: boolean, imageIndex: number) => {
      if (isActive && isLoading) {
         return `linear-gradient(0deg, rgba(241, 35, 84, 0.8) 0%, rgba(241, 35, 84, 0.8) 100%), url(${loader})`;
      }
      if (isActive) {
         return `url(${image.urls.thumb})`;
      }
      if (imageIndex <= progressIndex || isFinished) {
         return `linear-gradient(0deg, rgba(127, 127, 127, 0.5) 0%, rgba(127, 127, 127, 0.5) 100%), url(${image.urls.thumb})`;
      }
      return '';
   };

   const canInteract = (imageIndex: number) => imageIndex <= progressIndex || isFinished;

   return (
      <>
         {imgData?.map((image, imageIndex) => {
            const isActive = imageIndex === currentIndex;
            const isInteractive = canInteract(imageIndex);

            return (
               <button
                  key={image.id}
                  className={getPreviewClassName(isActive, imageIndex)}
                  style={{
                     backgroundImage: getBackgroundImage(image, isActive, imageIndex),
                     cursor: isInteractive && !isActive ? 'pointer' : '',
                  }}
                  onClick={() => isInteractive && dispatch(goToImage(imageIndex))}
                  disabled={isActive}
                  aria-label="Preview buttons for each image"
               />
            );
         })}
      </>
   );
};
