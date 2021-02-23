import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { DashboardContext } from '../../context/dashboard';
import GiftImages from '../GiftImages';
import GiftThumbnails from '../GiftThumbnails';
import GiftInfo from '../GiftInfo';
import './index.css';

const DashboardInfoBoxGift = () => {
  const { gift, imgIndex, setImgIndex, friend, lockGift, showConfirm, setShowConfirm } = useContext(DashboardContext);
  const sessionUser = useSelector(state => state.session.user);

  // Set img index
  const setIndex = (up) => {
    if (up === 1) {
      if (imgIndex === gift.WishImages.length - 1) {
        setImgIndex(0);
      } else {
        setImgIndex(imgIndex + 1);
      }
    } else {
      if (imgIndex === 0) {
        setImgIndex(gift.WishImages.length - 1);
      } else {
        setImgIndex(imgIndex - 1);
      }
    }
  };

  return (
    <div className='dibg__wrapper'>
      <div className='dashboard-info-box-gift__wrapper'>
        <GiftImages gift={gift} imgIndex={imgIndex} setIndex={setIndex} />
        <GiftThumbnails gift={gift} setImgIndex={setImgIndex} />
        <GiftInfo gift={gift} />

        {/* button */}
        {
          gift.status === 1
            ? (
              <div className='dashboard-info-box-gift__button-wrapper'>
                <button
                  className='dashboard-info-box-gift__checkout-button'
                  onClick={() => setShowConfirm(true)}
                >
                  Send Gift
                </button>
              </div>
              )
            : (
              <div className='dashboard-info-box-gift__button-wrapper'>
                <button className='dashboard-info-box-gift__checkout-button dibg__lock-button'>
                  Locked
                </button>
              </div>
              )
        }

        {/* confirm message */}
        {
        showConfirm && (
          <div className='dashboard-info-box-gift__confirm-background'>
            <div className='dashboard-info-box-gift__confirm-wrapper'>
              <img
                className='dashboard-info-box-gift__confirm-illustration'
                src='https://makeawish.s3.amazonaws.com/seed-data/confirm-3.png'
                alt='confirmation illustation'
              />
              <div className='dashboard-info-box-gift__confirm-message'>
                Do you want to send
                <span className='dibg__confirm-message-gift-title'>{` ${gift.title} `}</span>
                to
                <span className='dibg__confirm-message-friend'>{` ${friend.displayName} `}</span>
                ?
              </div>
              <div className='dashboard-info-box-gift__confirm-button-wrapper'>
                <button
                  className='dashboard-info-box-gift__confirm-buttons dibg__confirm-yes'
                  onClick={() => lockGift(gift.id, sessionUser.id)}
                >
                  Yes
                </button>
                <button
                  className='dashboard-info-box-gift__confirm-buttons dibg__confirm-no'
                  onClick={() => setShowConfirm(false)}
                >
                  Maybe later
                </button>
              </div>
              <div className='dashboard-info-box-gift__confirm-note'>
                *Once confirmed, cannot be canceled.
              </div>
            </div>
          </div>
        )
      }
      </div>
    </div>
  );
};

export default DashboardInfoBoxGift;
