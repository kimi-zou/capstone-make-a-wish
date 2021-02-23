import React from 'react';
import { useSelector } from 'react-redux';
import SettingsEntry from '../SettingsEntry';
import './index.css';

const Settings = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='settings__wrapper'>
      <div className='settings__inner-wrapper'>
        <div className='settings__heading'>Settings</div>
        <div className='settings__main-wrapper'>
          <div className='settings__main-left-wrapper'>
            <div className='settings__avatar-wrapper'>
              <img
                className='settings__avatar'
                src={sessionUser.avatar}
                alt='user avatar'
              />
            </div>
          </div>
          <div className='settings__main-right-wrapper'>
            <SettingsEntry label='Display Name' content={sessionUser.displayName} />
            <SettingsEntry label='Username' content={sessionUser.username} />
            <SettingsEntry label='Birthday' content={sessionUser.birthday} />
            <SettingsEntry label='Email' content={sessionUser.email} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
