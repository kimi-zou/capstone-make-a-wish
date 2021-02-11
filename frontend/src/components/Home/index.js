import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import HomeNav from '../NavHome';
import HomeLoginForm from '../HomeLoginForm';
import HomeSignupForm from '../HomeSignupForm';
import './index.css';

const Home = () => {
  const [showLogin, setShowLogin] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Redirect to='/dashboard' />;

  return (
    <div className='home__wrapper'>
      <HomeNav />
      <div className='home'>
        <div className='home--left'>
          <img
            className='home__splash-img'
            src='https://makeawish.s3.amazonaws.com/seed-data/splash-image.png'
            alt='home page splash'
          />
        </div>
        <div className='home--right'>
          <div className='home__welcome-message'>Time to...<br />
            <span className='home__welcome-message-logo'>Make a Wish</span>
          </div>
          <div className='auth__form-wrapper'>
            <div className='auth__buttons-wrapper'>
              <button
                className={showLogin
                  ? 'auth__buttons'
                  : 'auth__buttons auth__buttons--active'}
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
              <button
                className={showLogin
                  ? 'auth__buttons auth__buttons--active'
                  : 'auth__buttons'}
                onClick={() => setShowLogin(false)}
              >
                Signup
              </button>
            </div>
            {showLogin ? <HomeLoginForm /> : <HomeSignupForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
