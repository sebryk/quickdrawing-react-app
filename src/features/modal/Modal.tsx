import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import './Modal.css'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeModal } from "./modalSlice";
import { useRef, useEffect } from "react";
import { resetSelectedOptions } from "../objectsForm/objectsFormSlice";
import { setMouseOver, setMouseOut } from "../imageSlider/imageSliderSlice";


const Modal = () => {

  const dispatch = useAppDispatch()
  const imageSlider = useAppSelector(state => state.imageSlider)
  const completionBar = useAppSelector(state => state.completionBar)
  const modalRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const clearLocalStorage = () => {
    dispatch(closeModal())
    dispatch(resetSelectedOptions())
    navigate('/')
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && e.target instanceof Node &&  !modalRef.current.contains(e.target)) {
        dispatch(closeModal());
      }
    };
  
    document.addEventListener('mousedown', handleOutsideClick);
  
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  return ( 
    <div className="modal__overlay"
    onMouseOver={() => dispatch(setMouseOver())}
    >
      <div className="modal__container"
        ref={modalRef}
      >
        <button 
          onClick={() => dispatch(closeModal())}
          type="button"
          className="modal__close"
          aria-label="Close modal window"
          >
          <RxCross2
            className='modal__close-icon'
          />
        </button>
        <h3 className="modal__title">
        {imageSlider.isFinished && completionBar.completedPercentOfTime === 100 
        ? ( 
          <span> The session is finished.<br /> Do you want to start a new session? </span>
        ) : (
          `Do you want to finish this session?`
        )}
      </h3>
        <div className="modal__buttons-wrap">
          <button
            onClick={() => dispatch(closeModal())} 
            className="modal__btn"
          >No</button>
          <button
            className="modal__link"
            onClick={clearLocalStorage}
          >Yes</button>
        </div>
      </div>
    </div>
  );
}
 
export default Modal;


