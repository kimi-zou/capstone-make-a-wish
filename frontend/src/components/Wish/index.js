import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getWishes } from '../../store/wish';
import Gift from './Gift';
import CreateWishForm from './CreateWishForm';
import './styles/index.css';

const Wish = () => {
  const dispatch = useDispatch();
  const createWishRef = useRef();
  const [loaded, setLoaded] = useState();
  const [showCreateWishForm, setShowCreateWishForm] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const wishes = useSelector(state => state.wish.wishes);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getWishes(sessionUser.id))
        .then(() => setLoaded(true));
    }
  }, [dispatch, sessionUser, showCreateWishForm]);

  const handleClick = () => {
    setShowCreateWishForm(true);
  };

  if (!loaded) return null;

  return (
    <div className='wish'>
      <div>My Wishes</div>
      <div className='wish__gifts'>
        <button
          className='wish__add'
          onClick={handleClick}
        >
          +
        </button>
        {wishes.map((wish, index) => {
          if ((index === 3) || (index === wishes.length - 1)) {
            return (
              <div key={`wish-container-${index}`}>
                <Gift
                  wish={wish}
                  key={wish.id}
                />
                {showCreateWishForm &&
                  <CreateWishForm
                    createWishRef={createWishRef}
                    showCreateWishForm={showCreateWishForm}
                    setShowCreateWishForm={setShowCreateWishForm}
                    key={`wish-form-${index}`}
                  />}
              </div>
            );
          } else {
            return (
              <Gift wish={wish} key={wish.id} />
            );
          }
        })}
      </div>

    </div>
  );
};

export default Wish;
