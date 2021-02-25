import React from 'react';

import HomeNav from '../NavHome';
import './index.css';

const About = () => {
  return (
    <div className='about__wrapper'>
      <HomeNav />
      <div className='about__main'>
        <div className='about__main-left'>
          <div className='about__intro-heading'>
            Share your birthday gift wishes on
            <a
              className='about__intro-heading-logo'
              href='/'
            > MakeAwish
            </a>.
          </div>
          <div className='about__intro'>
            MakeAwish is a birthday reminder app.
            When friends or families' birthdays are coming up,
            check out their wishes and send them their favourite gifts!
          </div>
          <div className='about__links'>
            <a href='https://github.com/Kimi-Zou'>
              <i className='about__icons fab fa-github' />
            </a>
            <a href='https://www.linkedin.com/in/kimizou'>
              <i className='about__icons fab fa-linkedin' />
            </a>
            <a href='https://angel.co/u/kimi-zou'>
              <i className='about__icons fab fa-angellist' />
            </a>
          </div>
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
