import './Contact.css'
import ContactForm from '../../features/contactForm/ContactForm'
import { persistor } from '../../store/store';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetSelectedOptions } from '../../features/objectsForm/objectsFormSlice';

const Contact = () => {

  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(resetSelectedOptions())
    persistor.purge()
  }, []);

  return (
    <section className="contact-section">
      <h1 className="contact-section__title">
        Contact us
      </h1>
      <p className="contact-section__text">
          Got a guestion? We’d love to hear from you. Send us a message and we’ll respond as soon as possible.
      </p>
      <ContactForm/>
    </section>   
  );
}

export default Contact;