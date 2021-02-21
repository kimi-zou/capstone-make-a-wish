import { useContext, useState } from 'react';
import { DashboardContext } from '../../context/dashboard';
import wishReducer from '../../store/wish';
import './index.css';

const DashboardInfoBoxGift = () => {
  const { gift, imgIndex, setImgIndex, friend, lockGift, showConfirm, setShowConfirm } = useContext(DashboardContext);

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

  console.log(gift);
  console.log(gift.WishImages);

  return (
    <div className='dibg__wrapper'>
      <div className='dashboard-info-box-gift__wrapper'>
        {/* image */}
        <div className='dashboard-info-box-gift__image-wrapper'>
          <img
            className='dashboard-info-box-gift__image'
            src={gift.WishImages[imgIndex].image}
            alt='gift'
          />
          <div className='dashboard-info-box-gift__image-left-button dibg__image-buttons'>
            <i
              className='fas fa-chevron-left'
              onClick={() => setIndex(0)}
            />
          </div>
          <div className='dashboard-info-box-gift__image-right-button dibg__image-buttons'>
            <i
              className='fas fa-chevron-right'
              onClick={() => setIndex(1)}
            />
          </div>
        </div>

        {/* thumbnails */}
        <div className='dashboard-info-box-gift__image-thumbnail-wrapper'>
          {
          gift.WishImages.map((img, idx) => (
            <img
              key={img.id} src={img.image} alt='gift thumbnail'
              className='dashboard-info-box-gift__image-thumbnail'
              onClick={() => setImgIndex(idx)}
            />
          ))
        }
        </div>

        {/* gift info */}
        <div className='dashboard-info-box-gift__info-wrapper'>
          <div className='dashboard-info-box-gift__title'>{gift.title}</div>
          <div className='dashboard-info-box-gift__description'>{gift.description}</div>
          <div className='dashboard-info-box-gift__link'>
            <a href={gift.link}>get more info</a>
          </div>
        </div>

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
                  onClick={() => lockGift(gift.id)}
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
