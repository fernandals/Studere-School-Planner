import React, { useState, useEffect } from 'react';

import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, LineChart, Line, Cell, ResponsiveContainer } from 'recharts';

import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import StudyTimeDoughnutChat from '@/components/studyTimeDoughnutChart';
import StreaksCard from '@/components/streaksCard';

import styles from '@/styles/dashboard.module.css';

import barData from '@/utils/mockBar.json';
import pieData from '@/utils/mockPie.json';

const Dashboard = () => {
  const [studyTime, setStudyTime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMockStudyTime = async () => {
      setTimeout(() => setStudyTime(30), 1000); // Simulate a delay
      setLoading(false);
    };
  
    fetchMockStudyTime();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '200px', padding: '20px', flex: '1' }} className={styles.content}>

        <Header 
          title="Dashboard" 
          buttonText={undefined} 
          onButtonClick={undefined} 
        />

        <div className={styles.dashboard}>
          <header className={styles.dashboardHeader}>
            <h1>Your Study Insights</h1>
            <select>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </header>

          <div className={styles.dashboardGrid}>
            <StudyTimeDoughnutChat/>
            <StreaksCard/>

            <div className={styles.card}>
              <h2>Time Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="time" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.card}>
              <h2>Topic Completion</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#82ca9d"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#8884d8' : '#82ca9d'} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
