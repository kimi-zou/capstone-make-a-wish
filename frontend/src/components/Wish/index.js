import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getWishes } from '../../store/wish';
import Gift from './Gift';
import './styles/index.css';

const Wish = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState();
  const sessionUser = useSelector(state => state.session.user);
  const wishes = useSelector(state => state.wish.wishes);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getWishes(sessionUser.id))
        .then(() => setLoaded(true));
    }
  }, [dispatch, sessionUser]);

  if (!loaded) return null;

  return (
    <div className='wish'>
      <div>My Wishes</div>
      <div className='wish__gifts'>
        <button className='wish__add'>+</button>
        {wishes.map((wish, index) => {
          return (
            <Gift wish={wish} key={index} />
          );
        })}
      </div>

    </div>
  );
};

export default Wish;
