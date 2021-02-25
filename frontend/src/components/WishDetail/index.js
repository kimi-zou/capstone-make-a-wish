import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WishContext } from '../../context/wish';
import DeleteConfirmation from '../WishDeleteConfirmation';
import GiftImages from '../GiftImages';
import GiftThumbnails from '../GiftThumbnails';
import './index.css';
import GiftInfo from '../GiftInfo';

const WishDetail = () => {
  const wish = useSelector(state => state.wish.wish);
  const {
    updateStatus,
    showConfirmation,
    setShowConfirmation,
    imgIndex,
    setImgIndex,
    setIndex
  } = useContext(WishContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (wish) setLoaded(true);
  }, [wish]);

  if (!loaded) return null;

  return (
    <div className='wish__detail-wrapper'>
      <div className='wish__detail'>
        <GiftImages
          gift={wish}
          imgIndex={imgIndex}
          setIndex={setIndex}
        />
        <GiftThumbnails
          gift={wish}
          setImgIndex={setImgIndex}
        />
        <GiftInfo gift={wish} />
        {showConfirmation && <DeleteConfirmation />}
        <div className='wish__detail-buttons-wrapper'>
          {/* <button className='wish__detail-buttons wish__detail-edit'>edit</button> */}
          {
            wish.status === 0
              ? (
                <button
                  className='wish__detail-buttons wish__detail-make-public'
                  onClick={(e) => updateStatus(e, wish)}
                >make public
                </button>
                )
              : (
                <button
                  className='wish__detail-buttons wish__detail-make-private'
                  onClick={(e) => updateStatus(e, wish)}
                >keep private
                </button>
                )
          }
          <button
            className='wish__detail-buttons wish__detail-delete'
            onClick={() => setShowConfirmation(true)}
          >delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishDetail;
