import React from 'react';

import HomeNav from '../NavHome';
import './index.css';

const About = () => {
  return (
    <div className='about__wrapper'>
      <HomeNav />
      <div className='about__main'>
        <div className='about__intro'>
          <span className='about__logo'>MakeAwish </span>
          is a birthday reminder app.
        </div>
        <img
          className='about__background-image'
          src='https://makeawish.s3.amazonaws.com/seed-data/about-image.jpg'
          alt='birthday party illustration'
        />
      </div>
    </div>
  );
};

export default About;
