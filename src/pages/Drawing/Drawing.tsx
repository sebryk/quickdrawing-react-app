import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Modal from "../../features/modal/Modal";
import { useRef, useEffect, useState } from "react";
import { mouseIsMoving, } from "../../features/imageSlider/imageSliderSlice";
import ImageSlider from "../../features/imageSlider/ImageSlider";
import './Drawing.css'
import { useGetImagesByTypeQuery } from "../../services/imagesApi"; 
import { DataContext } from "../../context/context";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getRandomNumber } from "../../utils/getRandomNumber";
import { Toaster, toast } from "sonner";
import { LinearProgress } from "@mui/material";


const Drawing = () => {
  const dispatch = useAppDispatch()
  const selectedOptions = useAppSelector(state => state.selectedOptions)
  const imageSlider = useAppSelector(state => state.imageSlider)
  const modal = useAppSelector(state => state.modal)
  //random page numbers of fetch data
  const [randomPageNumber, setRandomPageNumber] = useState(0);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null); 
  // if object is human adding also gender and clothing option
  const objectQuery = selectedOptions?.object?.value === 'human' 
  ? `${selectedOptions?.object?.value} ${selectedOptions?.gender?.value} ${selectedOptions?.clothing?.value}`
  : selectedOptions?.object?.value

  const { data, isLoading, error, refetch} = useGetImagesByTypeQuery({query: String(objectQuery), page: randomPageNumber, count: Number(selectedOptions?.count?.value)})
  
  useEffect(() => {
    setRandomPageNumber(getRandomNumber(1))
    setTimeout(() => toast.info('Press play button and start drawing'), 300)
  }, []);

  const handleMouseMove = () => {
    dispatch(mouseIsMoving(true))

    if (timeoutId.current) clearTimeout(timeoutId.current);

    if (!imageSlider.isMouseOver) { 
      timeoutId.current = setTimeout(() => {
        dispatch(mouseIsMoving(false))
      }, 2300);
    }
  }
  
  useEffect(() => {
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      handleMouseMove()
    };
  }, []);

  //protection from using route '/drawing' without selected data
  if(!selectedOptions?.object){
    return <ErrorBoundary>Error: Options are not selected</ErrorBoundary>;
  } else if(error && 'status' in error) {
    return <ErrorBoundary>Error: {error.status} </ErrorBoundary>;
  }


  return (  
    data && !isLoading ? (
      <section className="drawing-section"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseMove}
        key={imageSlider.key}
        >
      {modal.isOpen ? 
      <Modal
      /> : null}
      <DataContext.Provider value={{data, refetch }}>
        <ImageSlider /> 
      </DataContext.Provider>
      <Toaster
        position="top-center"
        visibleToasts={1}
        toastOptions={{
          style: { 
            background: 'rgba(25, 25, 25, 0.8)',
            color: 'var(--red-color)',
            border: 'none',
            fontFamily: 'Montserrat',
            textAlign: 'center',
            width: 'unset',
            top: '5px',
            right: '40px'
          },
          className: 'my-toast',
        }}
      />
        </section>
    )
    :
    ( <div 
        className="skeleton__container"
      >
        <Skeleton 
          baseColor="#202020" 
          highlightColor="#F12354" 
          width='100%'
          height='100%'
          containerClassName="skeleton__animation"
        />
      </div>      
    )
  );
}
 
export default Drawing