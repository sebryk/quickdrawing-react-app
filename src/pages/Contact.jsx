import { useState } from "react";
import Button from "../components/Button";

function Contact() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const { name, email, message } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server)
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    // Clear form fields
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <section className="contact container">
      <h1 className="contact__title">
        Contact us
      </h1>
      <p className="contact__text">
          Got a guestion? We’d love to hear from you. Send us a message and we’ll respond as soon as possible.
      </p>
      <form className="contact__form" onSubmit={handleSubmit}>
        <input
          className="contact__form-input contact__form-input--fullname"
          type="text"
          placeholder="Full Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <input
          className="contact__form-input contact__form-input--email"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <textarea
          className="contact__form-textarea"
          placeholder="Message"
          name="message"
          value={message}
          onChange={handleChange}
        >
        </textarea>
        <Button
          name="Send"
          type="submit"
        />
      </form>
    </section>   
  );
}

export default Contact;