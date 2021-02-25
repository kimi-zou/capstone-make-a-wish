import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWish, getPublicWishes, getPrivateWishes } from '../../store/wish';
import { WishContext } from '../../context/wish';
import './index.css';

const DeleteConfirmation = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const wish = useSelector(state => state.wish.wish);
  const { setShowConfirmation, setShowWishDetail } = useContext(WishContext);

  const cancelDelete = () => setShowConfirmation(false);
  const confirmDelete = async () => {
    await dispatch(deleteWish(wish.id));
    await dispatch(getPublicWishes(sessionUser.id));
    await dispatch(getPrivateWishes(sessionUser.id));
    setShowWishDetail(false);
    setShowConfirmation(false);
  };

  return (
    <div className='wish-delete-confirm__background'>
      <div className='wish-delete-confirm__wrapper'>
        <div className='wish-delete-confirm__heading'>Confirmation</div>
        <div className='wish-delete-confirm__message'>
          Are you sure you want to delete
          <span className='wish-delete-confirm__wish-title'>
            {` ${wish.title} `}
          </span>
          ?
        </div>
        <div className='wish-delete-confirm__buttons-wrapper'>
          <button
            className='wish-delete-confirm__yes wish-delete-confirm__buttons'
            onClick={confirmDelete}
          >
            Delete
          </button>
          <button
            className='wish-delete-confirm__no wish-delete-confirm__buttons'
            onClick={cancelDelete}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
