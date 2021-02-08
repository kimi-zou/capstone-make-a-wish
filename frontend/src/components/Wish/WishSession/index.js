import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicWishes, getPrivateWishes, publicWish, privateWish, getWish } from '../../../store/wish';
import Gift from '../Gift';
import './index.css';

const WishSession = (props) => {
  const { button, heading, wishes, setShowWishDetail, setShowCreateWishForm } = props;
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  // Handle drop
  const dropHandler = async (e) => {
    e.preventDefault();
    const wishId = e.dataTransfer.getData('wishId');
    const status = e.dataTransfer.getData('status');

    if (parseInt(status) === 0) {
      await dispatch(publicWish(wishId));
    } else {
      await dispatch(privateWish(wishId));
    }

    await dispatch(getPublicWishes(sessionUser.id));
    await dispatch(getPrivateWishes(sessionUser.id));
    await dispatch(getWish(wishId));
  };

  // Handle drag over
  const dragoverHandler = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Render
  return (
    <div className='wish__session' onDrop={dropHandler} onDragOver={dragoverHandler}>
      <div className='wish-session__heading'>{heading}</div>
      <div className='wish-session__gifts'>
        {button}
        {
          wishes.map((wish) =>
            <Gift
              wish={wish}
              key={wish.id}
              setShowWishDetail={setShowWishDetail}
              setShowCreateWishForm={setShowCreateWishForm}
            />)
        }
      </div>
    </div>
  );
};

export default WishSession;
