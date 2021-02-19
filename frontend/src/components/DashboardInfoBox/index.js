import { useContext } from 'react';
import { DashboardContext } from '../../context/dashboard';
import DashboardInfoBoxMonth from '../DashboardInfoBoxMonth';
import './index.css';

const DashboardInfoBox = () => {
  const { show } = useContext(DashboardContext);

  return (
    <div className='dashboard-info-box__wrapper'>
      {show === 'month' && <DashboardInfoBoxMonth />}
    </div>
  );
};

export default DashboardInfoBox;
