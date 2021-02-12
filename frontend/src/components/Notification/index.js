import React, { useEffect, useState } from 'react';
import { subscribeToTimer } from '../../services/socket';

const Notification = () => {
  const [time, setTime] = useState('no time yet');

  // useEffect(() => {
  //   const result = subscribeToTimer();
  //   console.log(result);
  //   setTime(result);
  // }, []);

  return (
    <div className='test'>
      <p className='test-intro'>
        This is the timer value: {time}
      </p>
    </div>
  );
};

export default Notification;
