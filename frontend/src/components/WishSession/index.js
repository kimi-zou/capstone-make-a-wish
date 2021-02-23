import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WishContext } from '../../context/wish';
import Gift from '../WishGift';
import AddWishButton from '../WishAddButton';
import './index.css';

const WishSession = ({ type, heading }) => {
  const publicWishes = useSelector(state => state.wish.publicWishes);
  const privateWishes = useSelector(state => state.wish.privateWishes);
  const [wishes, setWishes] = useState([]);
  const {
    dropHandler,
    dragoverHandler
  } = useContext(WishContext);

  useEffect(() => {
    if (type === 'public') {
      setWishes(publicWishes);
    } else {
      setWishes(privateWishes);
    }
  }, [type, publicWishes, privateWishes]);

  // Render
  return (
    <div
      className='wish__session'
      onDrop={dropHandler}
      onDragOver={dragoverHandler}
    >
      <div className='wish-session__heading'>{heading}</div>
      <div className='wish-session__gifts'>
        {type === 'public' && <AddWishButton />}
        {
          wishes.length > 0 && wishes.map((wish) => <Gift wish={wish} key={wish.id} />)
        }
      </div>
    </div>
  );
};

export default WishSession;
