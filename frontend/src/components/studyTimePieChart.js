import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

import styles from '@/styles/dashboard.module.css';

const StudyTimePieChart = () => {
  const [data, setData] = useState([]);
  const [totalTime, setTotalTime] = useState(0);

  // Mock data for now
  useEffect(() => {
    const fetchData = async () => {
      const studyData = [
        { course: 'Math', time: 10 },
        { course: 'Science', time: 8 },
        { course: 'History', time: 7 },
      ];
      setData(studyData);

      const total = studyData.reduce((sum, entry) => sum + entry.time, 0);
      setTotalTime(total);
    };

    fetchData();
  }, []);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div className={styles.card}>
      <h2>Total Study Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="time"
            nameKey="course"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ name }) => name}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className={styles.totalTime}>
        <p>{totalTime} hours</p>
      </div>
    </div>
  );
};

export default StudyTimePieChart;
