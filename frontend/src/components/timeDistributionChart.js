import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import styles from '@/styles/dashboard.module.css'

const TimeDistributionCard = () => {
  const barData = [
    { name: 'Mon', time: 3 },
    { name: 'Tue', time: 4 },
    { name: 'Wed', time: 2 },
    { name: 'Thu', time: 5 },
    { name: 'Fri', time: 6 },
    { name: 'Sat', time: 7 },
    { name: 'Sun', time: 4 },
  ];

  return (
    <div className={styles.card}>
      <h2>Time Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={barData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="time" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeDistributionCard;
