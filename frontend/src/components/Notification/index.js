import React, { useEffect, useState } from 'react';
import { subscribeToTimer } from '../../services/socket';

const Notification = () => {
  const [time, setTime] = useState('no time yet');

  useEffect(() => {
    subscribeToTimer((err, timestamp) => {
      if (err) console.log(err);
      setTime(timestamp);
    });
  }, []);

  return (
    <div className='test'>
      <p className='test-intro'>
        This is the timer value: {time}
      </p>
    </div>
  );
};

export default Notification;
