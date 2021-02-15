import { useEffect, useState } from 'react';

const DashboardViewMonths = () => {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const months = [];
    for (let i = 1; i < 13; i++) {
      months.push(i);
    }
    setMonths(months);
  }, []);

  return (
    <div className='dashboard-months__wrapper'>
      {months.map(month => <div key={month}>{month}</div>)}
    </div>
  );
};

export default DashboardViewMonths;
