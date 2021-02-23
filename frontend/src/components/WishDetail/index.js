import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { WishContext } from '../../context/wish';
import DeleteConfirmation from '../WishDeleteConfirmation';
import './index.css';

const WishDetail = () => {
  const wish = useSelector(state => state.wish.wish);
  const { updateStatus, showConfirmation, setShowConfirmation } = useContext(WishContext);

  // Render
  return (
    <div className='wish__detail'>
      {showConfirmation &&
        <DeleteConfirmation
          id={wish.id}
          title={wish.title}
        />}
      <div>
        <img
          className='detail__image'
          src={wish.WishImages[0].image}
          alt='gift'
        />
      </div>
      <div>{wish.title}</div>
      <div>{wish.description}</div>
      <div>
        {wish.link && <a href={wish.link}>more information</a>}
      </div>
      <div>{wish.quantity}</div>
      <button>edit</button>
      <button onClick={() => setShowConfirmation(true)}>delete</button>
      {
        wish.status === 0
          ? <button onClick={(e) => updateStatus(e, wish)}>make public</button>
          : <button onClick={(e) => updateStatus(e, wish)}>keep private</button>
      }
    </div>
  );
};

export default WishDetail;
