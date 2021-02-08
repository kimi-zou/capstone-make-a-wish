import React from 'react';
import { useDispatch } from 'react-redux';
import { getWish } from '../../../store/wish';
import './index.css';

const Gift = ({ wish, setShowWishDetail, setShowCreateWishForm }) => {
  const dispatch = useDispatch();

  // Show wish details
  const showWishDetials = () => {
    dispatch(getWish(wish.id))
      .then(() => {
        setShowWishDetail(true);
        setShowCreateWishForm(false);
      });
  };

  // Set data for drag event
  const setData = (e) => {
    e.dataTransfer.setData('wishId', wish.id);
    e.dataTransfer.setData('status', wish.status);
  };

  // Render
  return (
    <div
      className='gift wish__items'
      draggable='true'
      onDragStart={setData}
      onClick={showWishDetials}
    >
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
