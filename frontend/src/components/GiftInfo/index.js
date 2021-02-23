import './index.css';

const GiftInfo = ({ gift }) => {
  return (
    <div className='gift-info__wrapper'>
      <div className='gift-info__title'>{gift.title}</div>
      <div className='gift-info__description'>{gift.description}</div>
      <div className='gift-info__link'>
        <a href={gift.link}>get more info</a>
      </div>
    </div>
  );
};

export default GiftInfo;
