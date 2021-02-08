import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicWishes, getPrivateWishes } from '../../store/wish';
import CreateWishForm from './CreateWishForm';
import WishDetail from './WishDetail';
import AddWishButton from './AddWishButton';
import WishSession from './WishSession';
import './index.css';

const Wish = () => {
  const dispatch = useDispatch();

  // Store state
  const sessionUser = useSelector(state => state.session.user);
  const publicWishes = useSelector(state => state.wish.publicWishes);
  const privateWishes = useSelector(state => state.wish.privateWishes);

  // Local state
  const [loaded, setLoaded] = useState();
  const [showCreateWishForm, setShowCreateWishForm] = useState(false);
  const [showWishDetail, setShowWishDetail] = useState(false);

  // Get all wishes of session user
  useEffect(() => {
    if (sessionUser) {
      dispatch(getPublicWishes(sessionUser.id))
        .then(() => dispatch(getPrivateWishes(sessionUser.id)))
        .then(() => setLoaded(true));
    }
  }, [dispatch, sessionUser]);

  if (!loaded) return null;

  return (
    <div className='wish'>
      <div className='wish__heading'>My Wishes</div>
      {
        showCreateWishForm &&
          <CreateWishForm
            showCreateWishForm={showCreateWishForm}
            setShowCreateWishForm={setShowCreateWishForm}
          />
      }
      <div className='wish__main'>
        <div className='wish__main--left'>
          <WishSession
            button={
              <AddWishButton
                showCreateWishForm={showCreateWishForm}
                setShowCreateWishForm={setShowCreateWishForm}
                setShowWishDetail={setShowWishDetail}
              />
            }
            heading='Public wishes'
            wishes={publicWishes}
            setShowWishDetail={setShowWishDetail}
            setShowCreateWishForm={setShowCreateWishForm}
          />
          <WishSession
            heading='Private wishes'
            wishes={privateWishes}
            setShowWishDetail={setShowWishDetail}
            setShowCreateWishForm={setShowCreateWishForm}
          />
        </div>
        <div className='wish__main--right'>
          {
            showWishDetail &&
              <WishDetail setShowWishDetail={setShowWishDetail} />
          }
        </div>
      </div>
    </div>
  );
};
export default Wish;
