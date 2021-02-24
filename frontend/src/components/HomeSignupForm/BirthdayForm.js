import React, { useState } from 'react';
import './BirthdayForm.css';

const BirthdayForm = (props) => {
  const { birthday, setBirthday, setShowBirthday } = props;

  return (
    <div className='birthday-form__wrapper'>
      <div className='birthday-form__heading'>Please tell us your birthday (optional)</div>

      <div className='birthday-form__input-wrapper'>
        <i className='birthday-form__icon fas fa-birthday-cake' />
        <input
          className='birthday-form__input'
          type='date'
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </div>

      <button
        className='birthday-form__button-submit'
        type='submit'
      >Confirm
      </button>
      <div className='birthday-form__buttons-wrapper'>
        <button
          className='birthday-form__buttons'
          onClick={() => setShowBirthday(false)}
        >Back
        </button>
        <button
          className='birthday-form__buttons'
          type='submit'
        >Later
        </button>
      </div>
    </div>
  );
};

export default BirthdayForm;
