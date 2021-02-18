import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { DashboardContext } from '../../context/dashboard';
import './index.css';

const DashboardViewMonths = () => {
  const { getFriendsByMonth, month } = useContext(DashboardContext);
  const [months, setMonths] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(-1);

  console.log(month);

  useEffect(() => {
    const months = [];
    for (let i = 1; i < 13; i++) {
      months.push(i);
    }
    setMonths(months);
  }, []);

  useEffect(() => {
    setCurrentMonth(moment(new Date()).month());
  }, []);

  return (
    <div className='dashboard-months__wrapper'>
      {months.map((number, index) => {
        return (
          <div
            key={number}
            id={`dashboard-months__month-${index}`}
            className={
              index === currentMonth
                ? 'dashboard-months__month dashboard-months__current-month'
                : index === month
                  ? 'dashboard-months__month dashboard-months__current-active'
                  : 'dashboard-months__month'
            }
            onClick={() => getFriendsByMonth(index)}
            onMouseEnter={() => setShowImage(number)}
            onMouseLeave={() => setShowImage(false)}
          >
            {
              showImage && showImage === number
                ? ''
                : number
              }
          </div>
        );
      })}
    </div>
  );
};

export default DashboardViewMonths;
