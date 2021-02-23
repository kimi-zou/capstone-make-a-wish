import React from 'react';
import './CreateWishFormField.css';

const CreateWishFormField = (props) => {
  const { label, type, value, setValue } = props;

  return (
    <div className='create-wish__field'>
      <label className='create-wish__label'>{label}</label>
      <input
        className='create-wish__input'
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default CreateWishFormField;
