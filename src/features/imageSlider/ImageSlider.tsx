import { RxCross2 } from 'react-icons/rx';
import './ImageSlider.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { goToNextImage, goToPrevImage, setIsLoading, setMouseOut, setMouseOver } from './imageSliderSlice';
import { showModal } from '../modal/modalSlice';
import Loader from '../../components/Loader/Loader';
import ControlBarBtn from '../../components/ControlBarBtn/ControlBarBtn';
import { toggleTimer } from '../timer/timerSlice';
import { FaPlay } from 'react-icons/fa';
import { useContext } from 'react';
import { DataContext } from '../../context/context';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { NavigationButton } from './components/NavigationButton';
import { PreviewSection } from './components/PreviewSection';
import { PreviewDots } from './components/PreviewDots';
import { PreviewImages } from './components/PreviewImages';
import { Footer } from './components/Footer';

const ImageSlider = () => {
   const imageSlider = useAppSelector((state) => state.imageSlider);
   const timer = useAppSelector((state) => state.timer);
   const dispatch = useAppDispatch();
   const imgDataContext = useContext(DataContext);

   if (!imgDataContext) {
      return <ErrorBoundary>Error: The context data is unavailable</ErrorBoundary>;
   }

   const { data: imgData } = imgDataContext;
   const dataLength = imgData?.length || 0;

   const handleMouseOver = () => dispatch(setMouseOver());
   const handleMouseOut = () => dispatch(setMouseOut());

   return (
      <div className="image-slider">
         <div className="image-slider__btn-wrapper" onClick={() => dispatch(toggleTimer())}>
            {timer.isPaused && !imageSlider.isLoading && imageSlider.isMouseMoving && (
               <ControlBarBtn className="image-slider__btn">
                  <FaPlay className="image-slider__btn-icon image-slider__btn-icon--play" />
               </ControlBarBtn>
            )}
         </div>

         <button
            className="image-slider__close"
            onClick={() => dispatch(showModal())}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            style={{
               right: imageSlider.isMouseMoving ? '' : '-40px',
            }}
            aria-label="Close image slider"
         >
            <RxCross2 style={{ backgroundColor: 'rgb(25, 25, 25)' }} className="image-slider__close-icon" />
         </button>

         <Loader />

         <img
            title="img"
            className="image-slider__img"
            onLoad={() => setTimeout(() => dispatch(setIsLoading(false)), 300)}
            src={imgData?.[imageSlider.currentIndex]?.urls?.regular}
            alt={imgData?.[imageSlider.currentIndex]?.alt_description}
         />

         <NavigationButton
            direction="left"
            onClick={() => dispatch(goToPrevImage())}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            isDisabled={imageSlider.currentIndex === 0 || !imageSlider.isFinished}
            isVisible={imageSlider.isFinished}
            isMouseMoving={imageSlider.isMouseMoving}
         />
         <NavigationButton
            direction="right"
            onClick={() => dispatch(goToNextImage())}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            isDisabled={imageSlider.currentIndex === dataLength - 1 || !imageSlider.isFinished}
            isVisible={imageSlider.isFinished}
            isMouseMoving={imageSlider.isMouseMoving}
         />

         <PreviewSection
            dataLength={dataLength}
            isMouseMoving={imageSlider.isMouseMoving}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
         >
            <PreviewDots
               imgData={imgData}
               currentIndex={imageSlider.currentIndex}
               isMouseMoving={imageSlider.isMouseMoving}
            />
            <PreviewImages
               imgData={imgData}
               currentIndex={imageSlider.currentIndex}
               progressIndex={imageSlider.progressIndex}
               isFinished={imageSlider.isFinished}
               isLoading={imageSlider.isLoading}
            />
         </PreviewSection>

         <Footer
            imgData={imgData}
            currentIndex={imageSlider.currentIndex}
            isMouseMoving={imageSlider.isMouseMoving}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
         />
      </div>
   );
};

export default ImageSlider;
