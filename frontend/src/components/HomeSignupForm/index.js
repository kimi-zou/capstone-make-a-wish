import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import AuthField from '../HomeAuth';
import BirthdayForm from './BirthdayForm';

import { signup } from '../../store/session';
import '../HomeAuth/index.css';

const SignupForm = () => {
  const dispatch = useDispatch();
  const [showBirthday, setShowBirthday] = useState(false);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(signup({ email, username, password, birthday })).catch(
        (res) => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        }
      );
    }
    return setErrors([
      'Confirm Password field must be the same as the Password field'
    ]);
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
        {showBirthday
          ? (
            <BirthdayForm
              handleSubmit={handleSubmit}
              birthday={birthday}
              setBirthday={setBirthday}
              setShowBirthday={setShowBirthday}
            />
            )
          : (
            <>
              <AuthField
                icon={<i className='field__icon fa-lg fas fa-envelope' />}
                label='EMAIL'
                type='email'
                value={email}
                setValue={setEmail}
              />
              <AuthField
                icon={<i className='field__icon fa-lg fas fa-user' />}
                label='USERNAME'
                type='text'
                value={username}
                setValue={setUsername}
              />
              <AuthField
                icon={<i className='field__icon fa-lg fas fa-unlock-alt' />}
                label='PASSWORD'
                type='password'
                value={password}
                setValue={setPassword}
              />
              <AuthField
                icon={<i className='field__icon fa-lg fas fa-unlock-alt' />}
                label='CONFIRM PASSWORD'
                type='password'
                value={confirmPassword}
                setValue={setConfirmPassword}
              />
              <button
                className='field__buttons'
                type='button'
                onClick={() => setShowBirthday(true)}
              >
                Sign Up
              </button>
            </>
            )}
      </form>
    </>
  );
};

export default SignupForm;
