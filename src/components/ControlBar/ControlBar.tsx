import { useEffect, useContext } from 'react';
import { FaAngleLeft, FaPlay, FaAngleRight } from 'react-icons/fa' 
import { FaPause } from 'react-icons/fa6' 
import { TbReload } from 'react-icons/tb'
import ControlBarBtn from '../ControlBarBtn/ControlBarBtn';
import Timer from '../../features/timer/Timer';
import './ControlBar.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetTime, toggleTimer} from '../../features/timer/timerSlice';
import { setCompletionBar } from '../../features/completionBar/completionBarSlice';
import { goToNextImage, goToPrevImage, resetImageSlider, setIsFinished } from '../../features/imageSlider/imageSliderSlice';
import { showModal } from '../../features/modal/modalSlice';
import { DataContext } from '../../context/context';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const ControlBar = () => {

  const timer = useAppSelector(state => state.timer)
  const imageSlider = useAppSelector(state => state.imageSlider)
  const completionBar = useAppSelector(state => state.completionBar)
  const selectedOptions = useAppSelector(state => state.selectedOptions)
  const imgDataContext = useContext(DataContext)
  const dispatch = useAppDispatch()


  if (!imgDataContext) {
    return <ErrorBoundary>Error: The context data is unavailable</ErrorBoundary>;
  }
  const { data: imgData, refetch } = imgDataContext;

  useEffect(() => {
    const percentOfTime = ((timer.seconds / Number(selectedOptions.duration?.value) ) * 100).toFixed(2)
    if(selectedOptions.duration?.value){
      dispatch(setCompletionBar(Number(percentOfTime)))
    }
    if(imageSlider.currentIndex === imgData?.length - 1 && completionBar.completedPercentOfTime === 100) {
      dispatch(toggleTimer())
      dispatch(setIsFinished(true))
      dispatch(showModal())
    } else if (completionBar.completedPercentOfTime === 100) {
      dispatch(goToNextImage())
    }
  }, [timer.seconds])

  const resetSession = () => {
    dispatch(resetImageSlider())
    refetch()
  }


  return (  
    <div className="image-slider__control-wrapper"
      style={{
        position: imageSlider.isMouseMoving ? 'relative' : 'static'
      }}
    >
      <div className="image-slider__control-panel control-panel">
        <div className="control-panel__buttons">
          <ControlBarBtn
            className="control-panel__btn"
            handleClick={() => dispatch(goToPrevImage())}
            disabled={imageSlider.currentIndex === 0 || !imageSlider.isFinished}
          >
            <FaAngleLeft
              className='control-panel__btn-icon control-panel__btn-icon--prev'
            />
          </ControlBarBtn>
          <ControlBarBtn 
            className="control-panel__btn" 
            handleClick={() => dispatch(toggleTimer())}>
            {timer.isActive ? (
              <FaPause className="control-panel__btn-icon control-panel__btn-icon--pause" />
            ) : (
              <FaPlay className="control-panel__btn-icon control-panel__btn-icon--play" />
            )}
          </ControlBarBtn>
          <ControlBarBtn
            className="control-panel__btn"
            handleClick={() => dispatch(goToNextImage())}
            disabled={imageSlider.currentIndex === imgData.length - 1 || !imageSlider.isFinished}
          >
            <FaAngleRight
              className='control-panel__btn-icon control-panel__btn-icon--next'
            />
          </ControlBarBtn>
          <ControlBarBtn
            className="control-panel__btn"
            handleClick={resetSession}
          >
            <TbReload
              className='control-panel__btn-icon control-panel__btn-icon--reset'
            />
          </ControlBarBtn>
        </div>
      </div>
      <div className="control-panel__timer"
        style={{
          top: imageSlider.isMouseMoving ? '' : '-28px',
          right: imageSlider.isMouseMoving ? '' : '20px'
        }}
      >
        <Timer/>
      </div>
    </div>
  );
}

export default ControlBar;