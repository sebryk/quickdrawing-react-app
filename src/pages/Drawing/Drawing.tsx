import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Modal from '../../features/modal/Modal';
import { useRef, useEffect, useState } from 'react';
import { mouseIsMoving } from '../../features/imageSlider/imageSliderSlice';
import ImageSlider from '../../features/imageSlider/ImageSlider';
import './Drawing.css';
import { useGetImagesByTypeQuery } from '../../services/imagesApi';
import { DataContext } from '../../context/context';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { toast } from 'sonner';
import LoadingBar from '../../components/LoadingBar/LoadingBar';
import { getRandomNumber } from '../../utils/getRandomNumber';
import MessageBar from '../../components/MessageBar/MessageBar';

const Drawing = () => {
   const dispatch = useAppDispatch();
   const { object, gender, clothing, count } = useAppSelector((state) => state.selectedOptions) || {};
   const { isMouseOver, key } = useAppSelector((state) => state.imageSlider);
   const { isOpen } = useAppSelector((state) => state.modal);

   const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
   const [randomPageNumber, setRandomPageNumber] = useState(0);

   const isHuman = object?.value === 'human';
   const objectQuery = isHuman ? `${object.value} ${gender?.value} ${clothing?.value}`.trim() : object?.value;

   const { data, isLoading, error, refetch } = useGetImagesByTypeQuery({
      query: String(objectQuery),
      page: randomPageNumber,
      count: Number(count?.value),
   });

   const handleMouseMove = () => {
      dispatch(mouseIsMoving(true));
      if (timeoutId.current) clearTimeout(timeoutId.current);

      if (!isMouseOver) {
         timeoutId.current = setTimeout(() => {
            dispatch(mouseIsMoving(false));
         }, 2300);
      }
   };

   useEffect(() => {
      setRandomPageNumber(getRandomNumber(1));
      const toastTimeoutId = setTimeout(() => toast.info('Press play button and start drawing'), 300);
      return () => {
         if (toastTimeoutId) clearTimeout(toastTimeoutId);
         if (timeoutId.current) clearTimeout(timeoutId.current);
         handleMouseMove();
      };
   }, []);

   if (!object) {
      return <ErrorBoundary>Error: Options are not selected</ErrorBoundary>;
   }
   if (error && 'status' in error) {
      return <ErrorBoundary>Error: {error.status}</ErrorBoundary>;
   }

   if (!data || isLoading) {
      return <LoadingBar />;
   }

   return (
      <section className="drawing-section" onMouseMove={handleMouseMove} onMouseDown={handleMouseMove} key={key}>
         {isOpen && <Modal />}
         <DataContext.Provider value={{ data, refetch }}>
            <ImageSlider />
         </DataContext.Provider>
         <MessageBar />
      </section>
   );
};

export default Drawing;
