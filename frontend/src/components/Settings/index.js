import React from 'react';
import { useSelector } from 'react-redux';
import './index.css';

const Settings = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='settings__wrapper'>
      <div className='settings__heading'>
        Settings
      </div>
      <div className='settings__avatar'>
        <img src={sessionUser.avatar} alt='user avatar' />
      </div>
    </div>
  );
};

export default Settings;
