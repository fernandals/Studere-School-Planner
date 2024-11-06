import React from 'react';

import Sidebar from '../components/sidebar';

import styles from 'calendar.module.css';

const Calendar = () => {
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ marginLeft: '250px', padding: '20px', flex: '1' }}>
          
        </main>
      </div>
    );
};

export default Calendar;
