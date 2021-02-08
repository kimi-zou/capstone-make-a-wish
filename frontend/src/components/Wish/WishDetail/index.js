import React from 'react';
import { useSelector } from 'react-redux';
import './index.css';

const WishDetail = () => {
  const wish = useSelector(state => state.wish.wish);

  const deleteWish = () => {

  };

  return (
    <div className='wish__detail'>
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
      <button onClick={deleteWish}>delete</button>
    </div>
  );
};

export default WishDetail;
