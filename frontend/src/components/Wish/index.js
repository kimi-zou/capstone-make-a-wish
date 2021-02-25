import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicWishes, getPrivateWishes } from '../../store/wish';
import { WishContext } from '../../context/wish';
import CreateWishForm from '../WishCreateForm';
import WishDetail from '../WishDetail';
import WishSession from '../WishSession';
import './index.css';

const Wish = () => {
  const dispatch = useDispatch();
  const { showCreateWishForm, showWishDetail } = useContext(WishContext);
  const sessionUser = useSelector(state => state.session.user);
  const publicWishes = useSelector(state => state.wish.publicWishes);
  const privateWishes = useSelector(state => state.wish.privateWishes);
  const [localPublicWishes, setLocalPublicWishes] = useState([]);
  const [localPrivateWishes, setLocalPrivateWishes] = useState([]);

  // Get all wishes of session user
  useEffect(() => {
    if (sessionUser) {
      dispatch(getPublicWishes(sessionUser.id));
      dispatch(getPrivateWishes(sessionUser.id));
    }
  }, [dispatch, sessionUser]);

  // Set local wishes
  useEffect(() => {
    if (publicWishes) setLocalPublicWishes(publicWishes);
    if (privateWishes) setLocalPrivateWishes(privateWishes);
  }, [publicWishes, privateWishes]);

  return (
    <div className='wish__wrapper'>
      <div className='wish__left-wrapper'>
        <div className='wish__heading'>My Wishes</div>
        {showCreateWishForm && <CreateWishForm />}
        <WishSession type='public' wishes={localPublicWishes} heading='Public wishes' />
        <WishSession type='private' wishes={localPrivateWishes} heading='Private wishes' />
      </div>
      <div className='wish__right-wrapper'>
        {showWishDetail && <WishDetail />}
      </div>
    </div>
  );
};
export default Wish;
