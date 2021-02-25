import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { WishContext } from '../../context/wish';
import { getWish } from '../../store/wish';
import './index.css';

const WishGift = ({ wish }) => {
  const dispatch = useDispatch();
  const { setShowWishDetail } = useContext(WishContext);

  const setData = (e) => {
    e.dataTransfer.setData('wishId', wish.id);
    e.dataTransfer.setData('status', wish.status);
  };

  // Show wish details
  const showWishDetials = (wish) => {
    dispatch(getWish(wish.id))
      .then(() => setShowWishDetail(true));
  };

  return (
    <div
      className='gift__image-wrapper'
      draggable='true'
      onDragStart={setData}
      onClick={() => showWishDetials(wish)}
    >
      {
        wish.WishImages &&
        wish.WishImages[0] &&
          <img
            className='gift__image'
            src={wish.WishImages[0].image}
            alt='gift'
          />
      }
    </div>
  );
};

export default WishGift;
