import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createWish, getWishes } from '../../store/wish';
import './styles/CreateWishForm.css';
import CreateWishFormField from './CreateWishFormField';
import ImageUpload from './ImageUpload';

const CreateWishForm = ({ setShowCreateWishForm }) => {
  const dispatch = useDispatch();

  // Store state
  const sessionUser = useSelector(state => state.session.user);

  // Local state
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [files, setFiles] = useState([]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);
    formData.append('quantity', quantity);

    dispatch(createWish(formData))
      .then(res => dispatch(getWishes(sessionUser.id)))
      .then(() => { setShowCreateWishForm(false); })
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  };

  return (
    <form
      className='create-wish'
      encType='multipart/form-data'
      onSubmit={handleSubmit}
    >
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className='create-wish--left'>
        <CreateWishFormField
          label='Title'
          type='text'
          value={title}
          setValue={setTitle}
        />
        <div className='create-wish__field'>
          <label className='create-wish__label'>Description</label>
          <textarea
            className='create-wish__textarea'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <CreateWishFormField
          label='Link'
          type='text'
          value={link}
          setValue={setLink}
        />
        <CreateWishFormField
          label='Quantity'
          type='number'
          value={quantity}
          setValue={setQuantity}
        />
      </div>
      <div className='create-wish--right'>
        <ImageUpload files={files} setFiles={setFiles} />
        <button type='submit'>Submit</button>
        <button type='button' onClick={() => setShowCreateWishForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default CreateWishForm;
