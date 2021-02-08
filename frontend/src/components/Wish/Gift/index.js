import React from 'react';
import { useDispatch } from 'react-redux';
import { getWish } from '../../../store/wish';
import './index.css';

const Gift = ({ wish, setShowWishDetail, setShowCreateWishForm }) => {
  const dispatch = useDispatch();

  const fetchSingleWish = () => {
    dispatch(getWish(wish.id))
      .then(() => {
        setShowWishDetail(true);
        setShowCreateWishForm(false);
      });
  };

  return (
    <div className='gift wish__items' onClick={fetchSingleWish}>
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
