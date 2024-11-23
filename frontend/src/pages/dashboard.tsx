import React from 'react';

import Sidebar from '../components/sidebar';
import Header from '@/components/header';

import styles from '@/styles/dashboard.module.css';

const Dashboard = () => {
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ marginLeft: '200px', padding: '20px', flex: '1' }} className={styles.content}>

          <Header 
            title="Dashboard" 
            buttonText={undefined} 
            onButtonClick={undefined} 
          />

        </main>
      </div>
    );
};

export default Dashboard;
