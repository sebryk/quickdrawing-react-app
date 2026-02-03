import { persistor } from '../../store/store';
import { useEffect } from 'react';
import './About.css';
import { useAppDispatch } from '../../store/hooks';
import { resetSelectedOptions } from '../../features/objectsForm/objectsFormSlice';

const About = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetSelectedOptions())
    persistor.purge()
  }, []);

  return (
    <section className="about-section">
      <article className="about-section__article">
        <h1 className="about-section__article-title">
          About project
        </h1>
        <p className="about-section__article-text">
          Pinterest helps you discover and do what you love. To do that, we show you things we think will be relevant, interesting and personal to you based on your onsite and offsite activity. To provide our Service, we need to be able to identify you and your interests. Some of the things we show you are promoted by advertisers. As part of our service we try to ensure that even promoted content is relevant and interesting to you. You can identify promoted content because it will be clearly labelled.
        </p>
        <h2 className="about-section__copyright-title">
          Copyright 
        </h2>
        <p className="about-section__copyright-text">
          Pinterest respects the intellectual property rights of others and we expect people on Pinterest to do the same. It’s our policy—in appropriate circumstances and at our discretion—to disable or terminate the accounts of people who repeatedly infringe or are repeatedly charged with infringing copyrights or other intellectual property rights.
          <br/><br/>
          In keeping with the Digital Millennium Copyright Act, which you can read at the US Copyright Office website, we’ll respond quickly to claims of copyright infringement on Pinterest that are reported to our designated copyright agent, identified below.
        </p>
      </article>
    </section>);
}

export default About;