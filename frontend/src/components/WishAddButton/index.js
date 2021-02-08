import React from 'react';

const AddWishButton = ({
  showCreateWishForm,
  setShowCreateWishForm,
  setShowWishDetail
}) => {
  // Show create wish form
  const openForm = () => {
    setShowCreateWishForm(true);
    setShowWishDetail(false);
  };

  return (
    <>
      {
        !showCreateWishForm &&
          <button
            className='wish__add wish__items'
            onClick={openForm}
          > +
          </button>
      }
    </>
  );
};

export default AddWishButton;
