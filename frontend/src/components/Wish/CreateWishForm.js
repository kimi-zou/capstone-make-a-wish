import React, { useEffect } from 'react';

const CreateWishForm = (props) => {
  const { setShowCreateWishForm, createWishRef } = props;

  useEffect(() => {
    if (createWishRef.current) createWishRef.current.focus();
  }, [createWishRef]);

  const handleBlur = (e) => {
    console.log(e.target);
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowCreateWishForm(false);
    }
  };

  return (
    <form
      className='create-wish'
      onBlur={handleBlur}
    >
      <div className='create-wish--left'>
        <div>
          <label>Title</label>
          <input type='text' ref={createWishRef} />
        </div>
        <div>
          <label>Description</label>
          <textarea />
        </div>
        <div>
          <label>Link</label>
          <input type='text' />
        </div>
        <div>
          <label>Quantity</label>
          <input type='number' />
        </div>
      </div>
      <div className='create-wish--right'>
        <button>Upload Image</button>
        <button>Submit</button>
        <button>Cancel</button>
      </div>
    </form>
  );
};

export default CreateWishForm;
