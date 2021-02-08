import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import AuthField from './AuthField';

import { login } from '../../store/session';
import './styles/auth.css';

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
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <AuthField
          icon={<i className='field__icon fa-lg fas fa-user' />}
          label='EMAIL/USERNAME'
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
        <button className='field__buttons' type='submit'>Log In</button>
      </form>
      <button type='button' onClick={demoLogin}>Demo</button>
    </>
  );
};

export default LoginForm;
