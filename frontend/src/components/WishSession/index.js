import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WishContext } from '../../context/wish';
import WishGift from '../WishGift';
import AddWishButton from '../WishAddButton';
import './index.css';

const WishSession = ({ type, heading }) => {
  const publicWishes = useSelector(state => state.wish.publicWishes);
  const privateWishes = useSelector(state => state.wish.privateWishes);
  const { dropHandler, dragoverHandler } = useContext(WishContext);
  const [wishes, setWishes] = useState([]);

  // Get public or private wishes
  useEffect(() => {
    if (type === 'public') {
      setWishes(publicWishes);
    } else {
      setWishes(privateWishes);
    }
  }, [type, publicWishes, privateWishes]);

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
