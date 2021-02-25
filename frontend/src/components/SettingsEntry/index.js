import moment from 'moment';
import './index.css';

const SettingsEntry = ({ label, content }) => {
  return (
    <div className='settings__display-entry'>
      <div className='settings__display-label'>{label}</div>
      <div className='settings__display-content'>
        {
          label === 'Birthday'
            ? (content
                ? moment(content).format('MM-DD-YYYY')
                : null
              )
            : content
        }
      </div>
    </div>
  );
};

export default SettingsEntry;
