import React, { useContext } from 'react';
import { WishContext } from '../../context/wish';
import './index.css';

const AddWishButton = () => {
  const { setShowCreateWishForm, setShowWishDetail, showCreateWishForm } = useContext(WishContext);

  if (showCreateWishForm) return null;

  return (
    <button
      className='wish__add-button'
      onClick={() => {
        setShowCreateWishForm(true);
        setShowWishDetail(false);
      }}
    > +
    </button>
  );
};

export default AddWishButton;
