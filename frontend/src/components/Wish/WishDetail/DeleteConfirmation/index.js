import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWish, getPublicWishes, getPrivateWishes } from '../../../../store/wish';

const DeleteConfirmation = ({
  id,
  title,
  setShowConfirmation,
  setShowWishDetail
}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const cancelDelete = () => setShowConfirmation(false);
  const confirmDelete = async () => {
    await dispatch(deleteWish(id));
    await dispatch(getPublicWishes(sessionUser.id));
    await dispatch(getPrivateWishes(sessionUser.id));
    setShowWishDetail(false);
  };

  return (
    <div className='delete-confirmation'>
      <div>Confirmation</div>
      <div>{`Are you sure you want to delete ${title}`}</div>
      <button onClick={confirmDelete}>Confirm</button>
      <button onClick={cancelDelete}>Cancel</button>
    </div>
  );
};

export default DeleteConfirmation;
