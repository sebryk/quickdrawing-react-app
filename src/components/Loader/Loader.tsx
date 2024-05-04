import { ImSpinner2 } from "react-icons/im";
import { useGetImagesByTypeQuery } from "../../services/imagesApi";
import { useAppSelector } from "../../store/hooks";

const Loader = () => {

  const imageSlider = useAppSelector(state => state.imageSlider)

  return (  
    <>
    <div className='image-slider__loader'
    style={{
      opacity: imageSlider.isLoading ? '1' : '0',
    }}
  >
    <ImSpinner2
      className='image-slider__loader-icon'
    />
    <div 
      className='image-slider__loader-background'>
    </div>
  </div>
    </>
  );
}
 
export default Loader;