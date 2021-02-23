import React, { useContext } from 'react';
import { WishContext } from '../../context/wish';
import './index.css';

const AddWishButton = () => {
  const { setShowCreateWishForm, showCreateWishForm } = useContext(WishContext);

  if (showCreateWishForm) return null;

  return (
    <button
      className='wish__add-button'
      onClick={() => {
        setShowCreateWishForm(true);
      }}
    > +
    </button>
  );
};

export default AddWishButton;
