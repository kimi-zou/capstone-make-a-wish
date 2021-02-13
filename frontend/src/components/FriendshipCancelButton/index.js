import { useDispatch, useSelector } from 'react-redux';
import {
  getFriends,
  getPendingFriends,
  deleteFriendship
} from '../../store/friendship';

const FriendshipCancelButton = ({ friendshipLookup }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const cancelFriendRequest = async () => {
    const friendship = await friendshipLookup();
    await dispatch(deleteFriendship(friendship.id));
    await dispatch(getPendingFriends(sessionUser.id));
    await dispatch(getFriends(sessionUser.id));
  };

  return (
    <button
      className='user-search-result__pending-buttons'
      onClick={cancelFriendRequest}
    >Cancel
    </button>
  );
};

export default FriendshipCancelButton;
