import { useState } from 'react';
import './index.css';

const SettingsEditFormImageUpload = ({ avatar, setAvatar }) => {
  const [showLabel, setShowLabel] = useState(false);

  // Preview cover image
  const readUrl = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById('avatar-preview').src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  return (
    <div className='settings-edit-form__image-input-wrapper'>
      <label
        className='settings-edit-form__image-label-wrapper'
        htmlFor='settings-edit-form__image-input'
      >
        <div className={showLabel
          ? 'settings-edit-form__image-preview settings-edit-form__image-preview--hover'
          : 'settings-edit-form__image-preview'}
        >
          {
            avatar &&
              <img
                id='avatar-preview'
                alt='avatar preview'
                src={avatar}
                onMouseEnter={() => setShowLabel(true)}
                onMouseLeave={() => setShowLabel(false)}
              />
          }
        </div>
        {
          showLabel &&
            <div
              className='settings-edit-form__image-upload-label'
              onMouseEnter={() => setShowLabel(true)}
              onMouseLeave={() => setShowLabel(false)}
            >
              <i className='settings-edit-form__image-upload-icon fas fa-camera' />
              Upload avatar
            </div>
        }
      </label>
      <input
        className='settings-edit-form__image-input'
        id='settings-edit-form__image-input'
        name='avatar'
        type='file'
        accept='.png,.jpg,.jpeg'
        onChange={(e) => { readUrl(e.target); setAvatar(e.target.files[0]); }}
      />
    </div>
  );
};

export default SettingsEditFormImageUpload;
