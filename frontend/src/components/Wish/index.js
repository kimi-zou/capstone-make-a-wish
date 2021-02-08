import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getWishes } from '../../store/wish';
import './index.css';

import CreateWishForm from './CreateWishForm';
import Gift from './Gift';
import WishDetail from './WishDetail';

const Wish = () => {
  const dispatch = useDispatch();

  // Store state
  const sessionUser = useSelector(state => state.session.user);
  const wishes = useSelector(state => state.wish.wishes);

  // Local state
  const [loaded, setLoaded] = useState();
  const [showCreateWishForm, setShowCreateWishForm] = useState(false);
  const [showWishDetail, setShowWishDetail] = useState(false);

  // Show create wish form
  const openForm = () => {
    setShowCreateWishForm(true);
    setShowWishDetail(false);
  };

  // Get all wishes of session user
  useEffect(() => {
    if (sessionUser) {
      dispatch(getWishes(sessionUser.id))
        .then(() => setLoaded(true));
    }
  }, [dispatch, sessionUser]);

  if (!loaded) return null;

  return (
    <div className='wish'>
      <div className='wish__heading'>My Wishes</div>
      {
        showCreateWishForm &&
          <CreateWishForm
            showCreateWishForm={showCreateWishForm}
            setShowCreateWishForm={setShowCreateWishForm}
          />
      }
      <div className='wish__main'>
        <div className='wish__gifts'>
          {!showCreateWishForm &&
            <button
              className='wish__add wish__items'
              onClick={openForm}
            > +
            </button>}
          {wishes.map((wish) =>
            <Gift
              wish={wish}
              key={wish.id}
              setShowWishDetail={setShowWishDetail}
              setShowCreateWishForm={setShowCreateWishForm}
            />)}
        </div>
        {showWishDetail && <WishDetail />}
      </div>
    </div>
  );
};
export default Wish;
