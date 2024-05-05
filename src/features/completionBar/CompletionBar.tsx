import ProgressBar from '@ramonak/react-progress-bar';
import { useAppSelector } from '../../store/hooks';



const CompletionBar = () => {
  const completionBar = useAppSelector(state => state.completionBar)
  return (  
    <ProgressBar
      key={completionBar.key}
      className='image-slider__progress-bar'
      completed={completionBar.completedPercentOfTime} 
      borderRadius='0'
      height='8px'
      bgColor='#F12354'
      isLabelVisible={false}
      transitionTimingFunction={'linear'}
      transitionDuration={completionBar.transitionDuration}
    />
  );
}
 
export default CompletionBar;