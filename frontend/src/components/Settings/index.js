import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsEntry from '../SettingsEntry';
import SettingsEditForm from '../SettingsEditForm';
import './index.css';

const Settings = () => {
  const sessionUser = useSelector(state => state.session.user);
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <div className='settings__wrapper'>
      <div className='settings__inner-wrapper'>
        <div className='settings__heading'>Settings</div>
        {
          showEditForm
            ? <SettingsEditForm setShowEditForm={setShowEditForm} />
            : (
              <div className='settings__main-wrapper'>
                <i
                  className='settings__edit-icon fas fa-edit'
                  onClick={() => setShowEditForm(true)}
                />
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
              )
          }
      </div>
    </div>
  );
};

export default Settings;
