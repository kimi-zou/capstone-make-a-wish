import { useEffect, useState } from 'react';
import './index.css';

const GiftImages = ({ gift, imgIndex, setIndex }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (gift) {
      setLoaded(true);
    }
  }, [gift]);

  if (!loaded) return null;

  return (
    <div className='gift-images__wrapper'>
      {
        imgIndex >= 0 &&
        gift.WishImages &&
        gift.WishImages[imgIndex] &&
          <img
            className='gift-images__image'
            src={gift.WishImages[imgIndex].image}
            alt='gift'
          />
      }
      <div className='gift-images__left-button gift-images__buttons'>
        <i
          className='fas fa-chevron-left'
          onClick={() => setIndex(0)}
        />
      </div>
      <div className='gift-images__right-button gift-images__buttons'>
        <i
          className='fas fa-chevron-right'
          onClick={() => setIndex(1)}
        />
      </div>
    </div>
  );
};

export default GiftImages;
