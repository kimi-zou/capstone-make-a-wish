import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getWish,
  publicWish,
  privateWish,
  getPublicWishes,
  getPrivateWishes
} from '../../../store/wish';
import './index.css';

const Gift = ({ wish, setShowWishDetail, setShowCreateWishForm }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

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

  // make wish public
  const makeWishPublic = async (e) => {
    e.stopPropagation();
    await dispatch(publicWish(wish.id));
    await dispatch(getPublicWishes(sessionUser.id));
    await dispatch(getPrivateWishes(sessionUser.id));
  };

  // make wish private
  const makeWishPrivate = async (e) => {
    e.stopPropagation();
    await dispatch(privateWish(wish.id));
    await dispatch(getPublicWishes(sessionUser.id));
    await dispatch(getPrivateWishes(sessionUser.id));
  };

  // Render
  return (
    <div
      className='gift wish__items'
      draggable='true'
      onDragStart={setData}
      onClick={showWishDetials}
    >
      {
        wish.status === 1
          ? <i
              className='gift__status fas fa-arrow-alt-circle-down'
              onClick={makeWishPrivate}
            />
          : <i
              className='gift__status fas fa-arrow-alt-circle-up'
              onClick={makeWishPublic}
            />
      }
      <img
        className='gift__image'
        src={wish.WishImages[0].image}
        alt='gift'

      />
      <div className='gift__title'>{wish.title}</div>
    </div>
  );
};

export default Gift;
