import './index.css';

const GiftThumbnails = ({ gift, setImgIndex }) => {
  return (
    <div className='gift-thumbnails__wrapper'>
      {
          gift.WishImages.map((img, idx) => (
            <img
              key={img.id} src={img.image} alt='gift thumbnail'
              className='gift-thumbnails'
              onClick={() => setImgIndex(idx)}
            />
          ))
        }
    </div>
  );
};

export default GiftThumbnails;
