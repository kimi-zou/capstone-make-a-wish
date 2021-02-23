import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { WishContext } from '../../context/wish';
import { getWish } from '../../store/wish';
import './index.css';

const WishGift = ({ wish }) => {
  const dispatch = useDispatch();
  const { setData, setShowWishDetail } = useContext(WishContext);

  // Show wish details
  const showWishDetials = (wish) => {
    dispatch(getWish(wish.id))
      .then(() => setShowWishDetail(true));
  };

  return (
    <div
      className='gift__image-wrapper'
      draggable='true'
      onDragStart={(e) => setData(e, wish)}
      onClick={() => showWishDetials(wish)}
    >
      <img
        className='gift__image'
        src={wish.WishImages[0].image}
        alt='gift'
      />
    </div>
  );
};

export default WishGift;
