import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import DeleteConfirmation from './DeleteConfirmation';
import './index.css';

const WishDetail = ({ setShowWishDetail }) => {
  const wish = useSelector(state => state.wish.wish);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const openDelteConfirmation = () => setShowConfirmation(true);

  return (
    <div className='wish__detail'>
      {showConfirmation &&
        <DeleteConfirmation
          id={wish.id}
          title={wish.title}
          setShowConfirmation={setShowConfirmation}
          setShowWishDetail={setShowWishDetail}
        />}
      <div>
        <img
          className='detail__image'
          src={wish.WishImages[0].image}
          alt='gift'
        />
      </div>
      <div>{wish.title}</div>
      <div>{wish.description}</div>
      <div>
        {wish.link && <a href={wish.link}>more information</a>}
      </div>
      <div>{wish.quantity}</div>
      <button>edit</button>
      <button onClick={openDelteConfirmation}>delete</button>
    </div>
  );
};

export default WishDetail;
