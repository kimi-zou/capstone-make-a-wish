import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeWishPublic, makeWishPrivate } from '../../../services/updateWishStatus';
import { getWish } from '../../../store/wish';
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

  // Handle status update
  const updateStatus = async (e) => {
    if (parseInt(wish.status) === 0) {
      await makeWishPublic(e, dispatch, wish, sessionUser);
    } else {
      await makeWishPrivate(e, dispatch, wish, sessionUser);
    }
    await dispatch(getWish(wish.id));
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
              onClick={updateStatus}
            />
          : <i
              className='gift__status fas fa-arrow-alt-circle-up'
              onClick={updateStatus}
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
