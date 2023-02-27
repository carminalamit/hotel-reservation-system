import React from 'react'
// import Daterange from '../components/Daterange';
// import Daterange from '../components/Daterange';
// import { DateRange } from 'react-date-range';
// import { DatePicker, Space } from 'antd';
import Logout from '../components/Logout'
import Room from '../components/Room';


const Dashboard = () => {
  return (
    <div>
      <Logout />
      <Room />
      {/* <Daterange /> */}
    </div>
  );
};
export default Dashboard;
