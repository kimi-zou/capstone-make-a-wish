import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createWish } from '../../store/wish';
import './styles/CreateWishForm.css';
import CreateWishFormField from './CreateWishFormField';
import ImageUpload from './ImageUpload';

const CreateWishForm = (props) => {
  const { setShowCreateWishForm } = props;
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [files, setFiles] = useState([]);

  const handleUploadWishImage = (e) => {
    // setImages(e.target.files);
  };

  return (
    <form className='create-wish'>
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
