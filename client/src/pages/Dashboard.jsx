import React from 'react'
// import Daterange from '../components/Daterange';
// import Daterange from '../components/Daterange';
// import { DateRange } from 'react-date-range';
// import { DatePicker, Space } from 'antd';
import Logout from '../components/Logout'
import Room from '../components/Room';
import { useEffect } from 'react';
import { app } from '../../lib/axios-config';


const Dashboard = () => {

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await app.post('/api/auth/verify');
        console.log(res)
      } catch (error) {
        window.location.href="/"
      }
    }
    verify()
  }, [])

  return (
    <div>
      <Logout />
      <Room />
      {/* <Daterange /> */}
    </div>
  );
};


export default Dashboard;
