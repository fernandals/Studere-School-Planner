import React from 'react';

import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

import styles from '@/styles/main.module.css';

const Home = () => {
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ marginLeft: '200px', padding: '20px', flex: '1' }} className={styles.content}>

          <Header 
            title="My Study App" 
            buttonText="Log In" 
            onButtonClick={() => console.log('Button clicked!')} 
          />


          {/* All pages follow this structure! */}
          
        </main>
      </div>
    );
};

export default Home;
