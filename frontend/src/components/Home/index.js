import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import HomeNav from '../NavHome';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import './styles/index.css';

const Home = () => {
  const [showLogin, setShowLogin] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Redirect to='/dashboard' />;

  return (
    <>
      <HomeNav />
      <div className='home'>
        <div className='home--left'>
          <img
            className='home__splash-img'
            src='https://d226aj4ao1t61q.cloudfront.net/ln5ny5ygh_girloncomputer1600x628.png'
            alt='home page splash'
          />
        </div>
        <div className='home--right'>
          <div className='auth__buttons'>
            <button className='auth__login' onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button className='auth__signup' onClick={() => setShowLogin(false)}>
              Signup
            </button>
          </div>
          {showLogin ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </>
  );
};

export default Home;
