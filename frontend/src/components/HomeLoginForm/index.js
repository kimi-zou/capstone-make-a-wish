import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../../store/session';
import AuthField from '../HomeAuth';
import '../HomeAuth/index.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login({ credential, password }))
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  };

  const demoLogin = () => {
    const credential = 'demo';
    const password = 'password';
    return dispatch(login({ credential, password }))
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  };

  return (
    <>
      <form className='auth-form' onSubmit={handleSubmit}>
        {errors.length > 0 &&
          <ul className='auth-form__errors-wrapper'>
            {errors.map((error, idx) => {
              if (error !== 'Invalid value') {
                return (
                  <li key={idx} className='auth-form__errors'>
                    <i className='auth-form__error-icon fas fa-exclamation-circle' />
                    {error}
                  </li>
                );
              }
            })}
          </ul>}
        <AuthField
          icon={<i className='field__icon fa-lg fas fa-user' />}
          label='EMAIL / USERNAME'
          type='text'
          value={credential}
          setValue={setCredential}
        />
        <AuthField
          icon={<i className='field__icon fa-lg fas fa-unlock-alt' />}
          label='PASSWORD'
          type='password'
          value={password}
          setValue={setPassword}
        />
        <div className='field__buttons-wrapper'>
          <button className='field__buttons field__login-button' type='submit'>Log In</button>
          <button
            className='field__demo-login'
            type='button'
            onClick={demoLogin}
          >
            Demo Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
