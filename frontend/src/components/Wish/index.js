import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getWishes } from '../../store/wish';
import CreateWishForm from './CreateWishForm';
import './styles/index.css';

import Gift from './Gift';

const Wish = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const wishes = useSelector(state => state.wish.wishes);
  const [loaded, setLoaded] = useState();
  const [showCreateWishForm, setShowCreateWishForm] = useState(false);

  // Get all wishes of session user
  useEffect(() => {
    if (sessionUser) {
      dispatch(getWishes(sessionUser.id))
        .then(() => setLoaded(true));
    }
  }, [dispatch, sessionUser]);

  // Show create wish form
  const handleClick = () => {
    setShowCreateWishForm(true);
  };

  if (!loaded) return null;

  return (
    <div className='wish'>
      <div className='wish__heading'>My Wishes</div>
      {
        showCreateWishForm &&
          <CreateWishForm
            className='test'
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
