import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getWishes } from '../../store/wish';
import './styles/index.css';

import CreateWishForm from './CreateWishForm';
import Gift from './Gift';

const Wish = () => {
  const dispatch = useDispatch();

  // Store state
  const sessionUser = useSelector(state => state.session.user);
  const wishes = useSelector(state => state.wish.wishes);

  // Local state
  const [loaded, setLoaded] = useState();
  const [showCreateWishForm, setShowCreateWishForm] = useState(false);

  // Show create wish form
  const handleClick = () => setShowCreateWishForm(true);

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
      <div className='wish__gifts'>
        {
          !showCreateWishForm &&
            <button
              className='wish__add wish__items'
              onClick={handleClick}
            > +
            </button>
        }
        {wishes.map((wish) => <Gift wish={wish} key={wish.id} />)}
      </div>
    </div>
  );
};
export default Wish;
