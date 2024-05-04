import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import TextArea from "../../components/TextArea/TextArea"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { set, clean } from "./contactFormSlice";
import { writeContactFormData } from "../../utils/writeContactFormData";

const ContactForm = () => {

  const contactFormData = useAppSelector(state => state.contactFormData)
  const dispatch = useAppDispatch()
  const [isSubmitted, setIsSubmitted] = useState(false);

  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const formData = { name , value }
     dispatch(set(formData))
  };
  const { name, email, message } = contactFormData;

  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    writeContactFormData(name, email, message)
    setIsSubmitted(true)
    dispatch(clean())
  };

  useEffect(() => {
    setTimeout(() => {
      setIsSubmitted(false)
    },5000)
  }, [isSubmitted]);



  return (
      <form className="contact-section__form" onSubmit={handleSubmit}>
        <TextInput
          className="contact-section__form-input contact-section__form-input--fullname"
          type="text"
          placeholder="Full Name"
          name="name"
          value={contactFormData.name}
          handleChange={handleChange}
          requierd 
        />
        <TextInput
          className="contact-section__form-input contact-section__form-input--email"
          type="email"
          placeholder="Email"
          name="email"
          value={contactFormData.email}
          handleChange={handleChange}
          requierd 
        />
        <TextArea
          className="contact-section__form-textarea"
          placeholder="Message"
          name="message"
          value={contactFormData.message}
          handleChange={handleChange}
          requierd 
        />
        <Button
          type="submit"
          className={`contact-section__form-btn btn ${isSubmitted ? 'btn--disabled' : ''}`}
          disabled={isSubmitted}
        >
          Send
        </Button>
        {isSubmitted && <p className="contact-section__form-message"> Thank you for you message. We will connect you very soon!</p>}
      </form>
  );
}

export default ContactForm;