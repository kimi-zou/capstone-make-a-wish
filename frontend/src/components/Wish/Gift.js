import React from 'react';
import './styles/Gift.css';

const Gift = ({ wish }) => {
  return (
    <div className='gift'>
      <img
        src={wish.WishImages[0].image}
        alt='gift'
        className='gift__image'
      />
      <div className='gift__title'>{wish.title}</div>
    </div>
  );
};

export default Gift;
