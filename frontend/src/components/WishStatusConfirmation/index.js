import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { WishContext } from '../../context/wish';

const WishStatusConfirmation = () => {
  const wish = useSelector(state => state.wish.wish);
  const {
    confirmHeading,
    confirmMessage,
    confirmHandler,
    cancelHandler,
    confirmButtonText
  } = useContext(WishContext);

  return (
    <div className='wish-confirm__background'>
      <div className='wish-confirm__wrapper'>
        <div className='wish-confirm__heading'>{confirmHeading}</div>
        <div className='wish-confirm__message'>
          {confirmMessage}
          <span className='wish-confirm__wish-title'>
            {` ${wish.title} `}
          </span>
          ?
        </div>
        <div className='wish-confirm__buttons-wrapper'>
          <button
            className='wish-confirm__yes wish-confirm__buttons'
            onClick={confirmHandler}
          >
            {confirmButtonText}
          </button>
          <button
            className='wish-confirm__no wish-confirm__buttons'
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishStatusConfirmation;
