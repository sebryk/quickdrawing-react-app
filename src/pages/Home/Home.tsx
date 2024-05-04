import { useEffect } from 'react';
import './Home.css'
import Form from "../../features/objectsForm/ObjectsForm";
import { useAppDispatch } from "../../store/hooks";
import { resetSelectedOptions } from "../../features/objectsForm/objectsFormSlice";
import { persistor } from '../../store/store';

const Home = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetSelectedOptions())
    persistor.purge()
  }, []);

  return (
    <section className="home-section">
        <h1 className="home-section__title">
          What do you want to draw?
        </h1>
        <p className="home-section__text">
        Select different objects, count of images and duration of time interval between drawings. 
        </p>
    <Form/>

    </section>
  );
}

export default Home;
