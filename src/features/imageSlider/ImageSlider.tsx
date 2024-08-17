import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia'
import { RxCross2 } from 'react-icons/rx'
import ControlBar from '../../components/ControlBar/ControlBar';
import './ImageSlider.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { goToNextImage, goToPrevImage, setIsLoading, setMouseOut, setMouseOver, goToImage } from './imageSliderSlice';
import CompletionBar from '../completionBar/CompletionBar';
import { showModal } from '../modal/modalSlice';
import Loader from '../../components/Loader/Loader';
import loader from '../../assets/loader.svg'
import ControlBarBtn from '../../components/ControlBarBtn/ControlBarBtn';
import { toggleTimer } from '../timer/timerSlice';
import { FaPlay } from 'react-icons/fa';
import { useContext } from 'react';
import { DataContext, IDataContext } from '../../context/context';
import { shortenAuthorsName } from '../../utils/shortenAuthorsName';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';


const ImageSlider = () => {


  const imageSlider = useAppSelector(state => state.imageSlider)
  const timer = useAppSelector(state => state.timer)
  const dispatch = useAppDispatch()
  const imgDataContext = useContext(DataContext)

  if (!imgDataContext) {
    return <ErrorBoundary>Error: The context data is unavailable</ErrorBoundary>;
  }
  
  const { data: imgData } = imgDataContext;
  const dataLength = imgData?.length || 0

  return (  
    <div className='image-slider'
    style={{
      backgroundImage: `url(${imgData?.[imageSlider.currentIndex].urls.regular})`,
      backgroundRepeat: 'repeat',
      backgroundSize: '50%',
    }}
    >
      <div className='image-slider__btn-wrapper'
        onClick={() => dispatch(toggleTimer())}
      >
        {timer.isPaused && !imageSlider.isLoading && imageSlider.isMouseMoving 
        && <ControlBarBtn 
            className='image-slider__btn'
            >
            <FaPlay className="image-slider__btn-icon image-slider__btn-icon--play" />
          </ControlBarBtn>}
      </div> 
      <Loader/>
      <img 
          title='img'
          className='image-slider__img'
          onLoad={() => setTimeout(() => dispatch(setIsLoading(false)), 300)}
          src={`${imgData?.[imageSlider.currentIndex]?.urls?.regular}`}
          alt={`${imgData?.[imageSlider.currentIndex]?.alt_description}`}
          />
      <button
        className='image-slider__arrow image-slider__arrow--left'
        onClick={() => dispatch(goToPrevImage())}
        onMouseOver={() => dispatch(setMouseOver())}
        onMouseOut={() => dispatch(setMouseOut())}
        type='button'
        aria-label='Go to the previous image'
        disabled={imageSlider.currentIndex === 0 || !imageSlider.isFinished}
        style={{
          left: imageSlider.isMouseMoving ? '' : '-120px',
          visibility:!imageSlider.isFinished ? 'hidden' : 'visible'
        }}
      >
        <LiaAngleLeftSolid 
          style={{ backgroundColor: 'rgb(25, 25, 25)',}}
          className='image-slider__arrow-icon'
        />
      </button>
      <button
        className='image-slider__arrow image-slider__arrow--right'
        onClick={() => dispatch(goToNextImage())}
        onMouseOver={() => dispatch(setMouseOver())}
        onMouseOut={() => dispatch(setMouseOut())}
        type='button'
        aria-label='Go to the next image'
        disabled={imageSlider.currentIndex === dataLength - 1 || !imageSlider.isFinished}
        style={{
          right: imageSlider.isMouseMoving ? '' : '-120px',
          visibility: !imageSlider.isFinished ? 'hidden' : 'visible'
        }}
      >
        <LiaAngleRightSolid
          style={{ backgroundColor: 'rgb(25, 25, 25)',}}
          className='image-slider__arrow-icon'
        />
      </button>
      <button
        className='image-slider__close'
        onClick={() => dispatch(showModal())}
        onMouseOver={() => dispatch(setMouseOver())}
        onMouseOut={() => dispatch(setMouseOut())}
        style={{
          right: imageSlider.isMouseMoving ? '' : '-40px'
        }}
        aria-label='Close image slider'
        >
        <RxCross2
          style={{ backgroundColor: 'rgb(25, 25, 25)',}}
          className='image-slider__close-icon'
        />
      </button>
      <div className='image-slider__preview'
        style={{
          gridTemplateRows: 
          dataLength > 13 && dataLength <= 26  ? 'repeat(2, 1fr)' : 
          dataLength > 26 && dataLength <= 39 ? 'repeat(3, 1fr)' :
          dataLength > 39 ? 'repeat(4, 1fr)' : '',
          bottom: imageSlider.isMouseMoving ? '' : '-88px',
        }}
        onMouseOver={() => dispatch(setMouseOver())}
        onMouseOut={() => dispatch(setMouseOut())}
      >
        <div className='image-slider__dots-container'
          style={{
          top: imageSlider.isMouseMoving ? '' : '-70px',
          opacity: imageSlider.isMouseMoving ? '' : '1'
        }}
        >
          {imgData?.map((dot, dotIndex) => {
            const isActive = dotIndex === imageSlider.currentIndex
            return  <div
                key={dot.id}
                className={`image-slider__preview-dot 
                ${isActive 
                ? 'image-slider__preview-dot--active' 
                : dotIndex > imageSlider.currentIndex
                ? 'image-slider__preview-dot--hidden'
                : ''}`}
              ></div>
          })}
        </div>
        {imgData?.map((image, imageIndex) => {
          const isActive = imageIndex === imageSlider.currentIndex
            return  <button
                      key={image.id}
                      className={`image-slider__preview-img 
                        ${isActive 
                        ? 'image-slider__preview-img--active'
                        : imageIndex > imageSlider.progressIndex && !imageSlider.isFinished
                        ? 'image-slider__preview-img--hidden'
                        : ''}`}
                      style={{
                        backgroundImage:
                          isActive && imageSlider.isLoading
                          ? `linear-gradient(0deg, rgba(241, 35, 84, 0.8) 0%, rgba(241, 35, 84, 0.8) 100%), url(${loader})`  
                          : isActive 
                          ? `url(${image?.urls?.thumb})` 
                          : imageIndex <= imageSlider.progressIndex || imageSlider.isFinished
                          ? `linear-gradient(0deg, rgba(127, 127, 127, 0.5) 0%, rgba(127, 127, 127, 0.5) 100%), url(${image.urls.thumb})`
                          : '',
                        cursor: !isActive && imageIndex <= imageSlider.progressIndex || imageSlider.isFinished ? 'pointer' : ''
                      }}
                      onClick={() => imageIndex <= imageSlider.progressIndex || imageSlider.isFinished ? dispatch(goToImage(imageIndex)) : null}
                      disabled={isActive}
                      aria-label='Preview buttons for each image'
                    />

        })}
      </div>
      <div 
          className='image-slider__footer-shadow'
          style={{
            bottom: imageSlider.isMouseMoving ? '' : '8px',
          }}
      >
      </div>
      <div className='image-slider__footer'
        style={{
          bottom: imageSlider.isMouseMoving ? '' : '-88px',
        }}
        onMouseOver={() => dispatch(setMouseOver())}
        onMouseOut={() => dispatch(setMouseOut())}
      >
        <CompletionBar/>
        <div
          className="image-slider__footer-logo logo"
          onClick={() => dispatch(showModal())}
        >
          QUICKDRAWING
        </div>
        <ControlBar
        />
        <h2 className="image-slider__footer-credit">
          Author:&ensp;
          {imgData?.map((image, imageIndex) => {
            
            if(imageIndex === imageSlider.currentIndex){
              return  <a 
                        key={image?.id}
                        href={`${image?.user?.links?.html}`} 
                        className='image-slider__footer-name'
                        target="_blank">
                          {shortenAuthorsName(image)}
                      </a>
            } 
          })}
        </h2>
      </div>
    </div> 
  );
}
 
export default ImageSlider;