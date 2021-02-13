import { useDispatch, useSelector } from 'react-redux';
import {
  getFriends,
  getPendingFriends,
  updateFriendship
} from '../../store/friendship';

const FriendshipIgnoreButton = ({ friendshipLookup }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  // Accept friend request
  const ignoreFriendRequest = async () => {
    const friendship = await friendshipLookup();
    await dispatch(updateFriendship(friendship.id, sessionUser.id, 2));
    await dispatch(getPendingFriends(sessionUser.id));
    await dispatch(getFriends(sessionUser.id));
  };

  return (
    <button
      className='user-search-result__pending-buttons'
      onClick={ignoreFriendRequest}
    >Ignore
    </button>
  );
};

export default FriendshipIgnoreButton;
