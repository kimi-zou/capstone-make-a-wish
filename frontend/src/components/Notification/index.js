import React, { useEffect, useState } from 'react';
// import { receiveFriendRequest } from '../../services/socket';

const Notification = () => {
  const [notification, setNotification] = useState('no notification yet');

  // useEffect(() => {
  //   const res = receiveFriendRequest();
  //   console.log(res);
  //   setNotification(res);
  // }, []);

  return (
    <div className='test'>
      <p className='test-intro'>
        This is the notification value: {notification}
      </p>
    </div>
  );
};

export default Notification;
