import React, { useContext } from 'react';
import { WishContext } from '../../context/wish';
import './index.css';

const Gift = ({ wish }) => {
  const {
    setData,
    showWishDetials
    // updateStatus
  } = useContext(WishContext);

  // Render
  return (
    <div
      className='gift__image-wrapper'
      draggable='true'
      onDragStart={(e) => setData(e, wish)}
      onClick={() => showWishDetials(wish)}
    >
      {/* {
        wish.status === 1
          ? <i
              className='gift__status-buttons fas fa-arrow-alt-circle-down'
              onClick={(e) => updateStatus(e, wish)}
            />
          : <i
              className='gift__status-buttons fas fa-arrow-alt-circle-up'
              onClick={(e) => updateStatus(e, wish)}
            />
      } */}
      <img
        className='gift__image'
        src={wish.WishImages[0].image}
        alt='gift'
      />
    </div>
  );
};

export default Gift;
