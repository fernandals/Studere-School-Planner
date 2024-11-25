import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import styles from '@/styles/dashboard.module.css';

// Function to generate a color palette
const generateColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 360) / numColors; // Evenly distribute hues
    colors.push(`hsl(${hue}, 80%, 75%)`); // Pastel color (lower saturation, higher lightness)
  }
  return colors;
};

const StudyTimeDoughnutChart = () => {
  const [data, setData] = useState([]);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const studyData = [
        { course: 'Math', time: 10 },
        { course: 'Science', time: 8 },
        { course: 'History', time: 7 },
        { course: 'Art', time: 5 },
        { course: 'Programming', time: 12 },
      ];
      setData(studyData);

      const total = studyData.reduce((sum, entry) => sum + entry.time, 0);
      setTotalTime(total);
    };

    fetchData();
  }, []);

  const COLORS = generateColors(data.length); // Generate dynamic colors based on data length

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
            innerRadius={80} // Creates the hollow center
            outerRadius={100} // Outer radius for the chart
            fill="#8884d8"
            paddingAngle={5} // Adds spacing between segments
            labelLine={false} // Disables label lines
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

      <div className={styles.legend}>
        {data.map((entry, index) => (
          <div key={index} className={styles.legendItem}>
            <span
              className={styles.colorBox}
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            <span>{entry.course}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyTimeDoughnutChart;
