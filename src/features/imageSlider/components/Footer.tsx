import { useAppDispatch } from '../../../store/hooks';
import { showModal } from '../../modal/modalSlice';
import CompletionBar from '../../completionBar/CompletionBar';
import ControlBar from '../../../components/ControlBar/ControlBar';
import { shortenAuthorsName } from '../../../utils/shortenAuthorsName';
import { FooterProps } from '../types';

export const Footer = ({ imgData, currentIndex, isMouseMoving, onMouseOver, onMouseOut }: FooterProps) => {
   const dispatch = useAppDispatch();
   const currentImage = imgData?.[currentIndex];

   return (
      <div
         className="image-slider__footer"
         style={{ bottom: isMouseMoving ? '' : '-88px' }}
         onMouseOver={onMouseOver}
         onMouseOut={onMouseOut}
      >
         <CompletionBar />
         <div className="image-slider__footer-logo logo" onClick={() => dispatch(showModal())}>
            QUICKDRAWING
         </div>
         <ControlBar />
         <h2 className="image-slider__footer-credit">
            Author:&ensp;
            {currentImage && (
               <a href={currentImage.user.links.html} className="image-slider__footer-name" target="_blank">
                  {shortenAuthorsName(currentImage)}
               </a>
            )}
         </h2>
      </div>
   );
};
