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
  const sessionUser = useSelector(state => state.session.user);
  const { showCreateWishForm, showWishDetail } = useContext(WishContext);
  const [loaded, setLoaded] = useState();

  // Get all wishes of session user
  useEffect(() => {
    if (sessionUser) {
      dispatch(getPublicWishes(sessionUser.id))
        .then(() => dispatch(getPrivateWishes(sessionUser.id)))
        .then(() => setLoaded(true));
    }
  }, [dispatch, sessionUser]);

  if (!loaded) return null;

  return (
    <div className='wish__wrapper'>
      <div className='wish__left-wrapper'>
        <div className='wish__heading'>My Wishes</div>
        {showCreateWishForm && <CreateWishForm />}
        <WishSession type='public' heading='Public wishes' />
        <WishSession type='private' heading='Private wishes' />
      </div>
      <div className='wish__right-wrapper'>
        {showWishDetail && <WishDetail />}
      </div>
    </div>
  );
};
export default Wish;
