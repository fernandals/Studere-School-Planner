import React from 'react';

import Sidebar from '@/components/sidebar';

import styles from 'sessions.module.css';

const Sessions = () => {
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ marginLeft: '250px', padding: '20px', flex: '1' }}>
          
        </main>
      </div>
    );
};

export default Sessions;
