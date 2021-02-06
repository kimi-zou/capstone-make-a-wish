import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createWish } from '../../store/wish';
import './styles/CreateWishForm.css';

import CreateWishFormField from './CreateWishFormField';

const CreateWishForm = (props) => {
  const { setShowCreateWishForm } = props;
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([]);

  const handleUploadWishImage = (e) => {
    // setImages(e.target.files);
  };

  // Preview wish images
  const readUrl = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      Promise.all(files.map(file => {
        return (new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', (event) => {
            resolve(event.target.result);
          });
          reader.addEventListener('error', reject);
          reader.readAsDataURL(file);
        }));
      }))
        .then(images => {
        /* Once all promises are resolved, update state with image URI array */
          setImages(images);
        }, error => {
          console.error(error);
        });
    }
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
        <div className='wish-images--display'>
          {images && images.map((image, idx) => (<img src={image} alt='' key={idx} />))}
        </div>
        <div>
          <label>Upload Image</label>
          <input
            type='file'
            accept='.png,.jpg,.jpeg'
            multiple
            onChange={(e) => { handleUploadWishImage(e); readUrl(e); }}
          />
        </div>
        <button type='submit'>Submit</button>
        <button type='button' onClick={() => setShowCreateWishForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default CreateWishForm;
