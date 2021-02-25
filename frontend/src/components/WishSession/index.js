import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPublicWishes,
  getPrivateWishes,
  publicWish,
  privateWish,
  getWish
} from '../../store/wish';
import WishGift from '../WishGift';
import AddWishButton from '../WishAddButton';
import './index.css';

const WishSession = ({ type, heading, wishes }) => {
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

  return (
    <div className='wish__session'>
      <div className='wish-session__heading'>{heading}</div>
      <div className='wish-session__gifts-wrapper'>
        {type === 'public' && <AddWishButton />}
        {
          wishes.length > 0 &&
          wishes.map((wish) => <WishGift wish={wish} key={wish.id} />)
        }
        {
          type === 'public'
            ? (
              <div
                className='wish-session__drop'
                onDrop={dropHandler}
                onDragOver={dragoverHandler}
              >
                <i className='wish-session__drop-icon fa-lg fas fa-bullhorn' />
                <div className='wish-session__drop-text'>
                  Drop to<br /> Make public
                </div>
              </div>
              )
            : (
              <div
                className='wish-session__drop'
                onDrop={dropHandler}
                onDragOver={dragoverHandler}
              >
                <i className='wish-session__drop-icon fa-lg far fa-edit' />
                <div className='wish-session__drop-text'>
                  Drop to<br /> Make private
                </div>
              </div>
              )
          }
      </div>
    </div>
  );
};

export default WishSession;
