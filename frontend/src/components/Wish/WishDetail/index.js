import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeWishPublic, makeWishPrivate } from '../../../services/updateWishStatus';
import { getWish } from '../../../store/wish';
import DeleteConfirmation from './DeleteConfirmation';
import './index.css';

const WishDetail = ({ setShowWishDetail }) => {
  const dispatch = useDispatch();
  const wish = useSelector(state => state.wish.wish);
  const sessionUser = useSelector(state => state.session.user);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Show delete confirmation message
  const openDelteConfirmation = () => setShowConfirmation(true);

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
      {
        wish.status === 0
          ? <button onClick={updateStatus}>make public</button>
          : <button onClick={updateStatus}>keep private</button>
      }
    </div>
  );
};

export default WishDetail;
