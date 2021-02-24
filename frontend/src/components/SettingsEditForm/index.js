import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { setUser } from '../../store/session';
import SettingsEditFormField from '../SettingsEditFormField';
import SettingsEditFormImageUpload from '../SettingsEditFormImageUpload';
import './index.css';

const SettingsEditForm = ({ setShowEditForm }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [avatar, setAvatar] = useState();
  const [displayName, setDisplayName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disableSave, setDisableSave] = useState(false);
  const [errors, setErrors] = useState([]);

  // Prefill form
  useEffect(() => {
    if (sessionUser) {
      setDisplayName(sessionUser.displayName);
      setBirthday(sessionUser.birthday);
      setEmail(sessionUser.email);
      setAvatar(sessionUser.avatar);
    }
  }, [sessionUser]);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setDisableSave(true);
      const data = new FormData();
      data.append('avatar', avatar);
      data.append('displayName', displayName);
      data.append('username', sessionUser.username);
      data.append('birthday', birthday);
      data.append('email', email);
      data.append('password', password);
      const res = await fetch(`/api/users/${sessionUser.id}`, {
        method: 'PATCH',
        headers: {
          'XSRF-Token': Cookies.get('XSRF-TOKEN')
        },
        body: data
      });
      if (res.ok) {
        const data = await res.json();
        await dispatch(setUser(data.user));
        setShowEditForm(false);
      } else {
        const data = await res.json();
        setErrors(data.errors);
        setDisableSave(false);
      }
    } else {
      setErrors(['Passwords do not match.']);
    }
  };

  return (
    <form
      className='settings-edit-form__wrapper'
      encType='multipart/form-data'
      onSubmit={handleSubmit}
    >
      <div className='settings-edit-form__left-wrapper'>
        <SettingsEditFormImageUpload avatar={avatar} setAvatar={setAvatar} />
        <div className='settings-edit-form__buttons-wrapper'>
          <button
            className='settings-edit-form__buttons settings-edit-form__button-save'
            type='submit'
            disabled={disableSave}
          >Save
          </button>
          <button
            className='settings-edit-form__buttons settings-edit-form__button-cancel'
            type='button'
            onClick={() => setShowEditForm(false)}
          >Cancel
          </button>
        </div>
      </div>
      <div className='settings-edit-form__right-wrapper'>
        <div className='settings-edit-form__field-wrapper'>
          <label className='settings-edit-form__field-lable'>Username</label>
          <div className='settings-edit-form__field-input settings-edit-form__field-username'>
            @{sessionUser.username}
          </div>
        </div>
        <SettingsEditFormField
          label='Display Name'
          type='text'
          value={displayName}
          setValue={setDisplayName}
        />
        <SettingsEditFormField
          label='Birthday'
          type='date'
          value={birthday}
          setValue={setBirthday}
        />
        <SettingsEditFormField
          label='Email'
          type='email'
          value={email}
          setValue={setEmail}
        />
        <SettingsEditFormField
          label='Password'
          type='password'
          value={password}
          setValue={setPassword}
        />
        <SettingsEditFormField
          label='Confirm Password'
          type='password'
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
        {
          errors.length > 0 &&
          errors.map((error, idx) => {
            if (error !== 'Invalid value') {
              return (
                <div className='settings-edit-form__errors' key={idx}>
                  {
                  error !== 'Invalid value' &&
                    <>
                      <i className='settings-edit-form__error-icon fas fa-exclamation-circle' />
                      {error}
                    </>
                }
                </div>
              );
            }
          })
        }
      </div>
    </form>
  );
};

export default SettingsEditForm;
