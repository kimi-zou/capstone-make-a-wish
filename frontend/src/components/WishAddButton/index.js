import React, { useContext } from 'react';
import { WishContext } from '../../context/wish';

const AddWishButton = () => {
  const { setShowCreateWishForm, setShowWishDetail, showCreateWishForm } = useContext(WishContext);

  return (
    <>
      {
        !showCreateWishForm &&
          <button
            className='wish__add wish__items'
            onClick={() => {
              setShowCreateWishForm(true);
              setShowWishDetail(false);
            }}
          > +
          </button>
      }
    </>
  );
};

export default AddWishButton;
