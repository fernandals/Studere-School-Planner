import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from 'recharts';

import styles from '@/styles/dashboard.module.css';

const StudySessionAmountChart = () => {
  const data = [
    { subject: 'Mon', sessions: 5 },
    { subject: 'Tue', sessions: 4 },
    { subject: 'Wed', sessions: 6 },
    { subject: 'Thu', sessions: 3 },
    { subject: 'Fri', sessions: 7 },
    { subject: 'Sat', sessions: 5 },
    { subject: 'Sun', sessions: 4 },
  ];

  return (
    <div className={styles.card}>
      <h2>Study Sessions Radar</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart outerRadius="80%" width={500} height={300} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Sessions" dataKey="sessions" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudySessionAmountChart;
