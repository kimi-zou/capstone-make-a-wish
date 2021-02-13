import { useDispatch, useSelector } from 'react-redux';
import {
  getFriends,
  getPendingFriends,
  updateFriendship
} from '../../store/friendship';

const FriendshipAcceptButton = ({ friendshipLookup }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  // Accept friend request
  const acceptFriendRequest = async () => {
    const friendship = await friendshipLookup();
    await dispatch(updateFriendship(friendship.id, sessionUser.id, 1));
    await dispatch(getPendingFriends(sessionUser.id));
    await dispatch(getFriends(sessionUser.id));
  };

  return (
    <button
      className='user-search-result__pending-buttons'
      onClick={acceptFriendRequest}
    >Accept
    </button>
  );
}
;

export default FriendshipAcceptButton;
