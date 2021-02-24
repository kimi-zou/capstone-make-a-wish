import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFriendPublicWishes } from '../../store/wish';
import { DashboardContext } from '../../context/dashboard';
import './index.css';

const DashboardFriendWishes = ({ friend }) => {
  const dispatch = useDispatch();
  const { displayGift, wishes, setWishes } = useContext(DashboardContext);

  // Get wishes
  useEffect(() => {
    dispatch(getFriendPublicWishes(friend.id))
      .then(res => {
        const wishes = res.data.wishes;
        wishes.sort((a, b) => a.status - b.status > 0 ? 1 : -1);
        setWishes(wishes);
      });
  }, [dispatch, friend.id]);

  return (
    <div className='dashboard-friend__wishes-wrapper'>
      <div className='dashboard-friend__wishes-heading'>Wishes</div>
      <div className='dashboard-friend__wish-list-wrapper'>
        {
          wishes.length > 0
            ? wishes.map(wish => (
              <div className='dashboard-friend___wish-image-wrapper' key={wish.id}>
                <img
                  className='dashboard-friend___wish-image'
                  src={wish.WishImages[0].image} alt='wish'
                  onClick={() => displayGift(wish)}
                />
                {
                  wish.status === 2 &&
                    <div
                      className='dashboard-friend___wish-lock'
                      onClick={() => displayGift(wish)}
                    >
                      <i className='dashboard-friend___wish-lock-icon fas fa-lock' />
                    </div>
                }
              </div>
              ))
            : <div className='dashboard-friend__wish-message'>
              {friend.displayName} has not posted wishes.
            </div>
        }
      </div>
    </div>
  );
};

export default DashboardFriendWishes;
