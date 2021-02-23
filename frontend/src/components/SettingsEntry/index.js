import './index.css';

const SettingsEntry = ({ label, content }) => {
  return (
    <div className='settings__display-entry'>
      <div className='settings__display-label'>{label}</div>
      <div className='settings__display-content'>{content}</div>
    </div>
  );
};

export default SettingsEntry;
