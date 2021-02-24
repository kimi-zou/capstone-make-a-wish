import './index.css';

const SettingsEditFormField = ({ label, type, value, setValue, inputclass }) => {
  return (
    <div className='settings-edit-form__field-wrapper'>
      <label className='settings-edit-form__field-lable'>{label}</label>
      <input
        className={`settings-edit-form__field-input ${inputclass}`}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SettingsEditFormField;
