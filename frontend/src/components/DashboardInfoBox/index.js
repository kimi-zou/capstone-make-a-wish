import { useContext } from 'react';
import { DashboardContext } from '../../context/dashboard';
import DashboardInfoMonth from '../DashboardInfoMonth';
import './index.css';

const DashboardInfoBox = () => {
  const { show } = useContext(DashboardContext);

  return (
    <div className='dashboard-info-box__wrapper'>
      {show === 'month' && <DashboardInfoMonth />}
    </div>
  );
};

export default DashboardInfoBox;
