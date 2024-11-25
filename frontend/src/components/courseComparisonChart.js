import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import styles from '@/styles/dashboard.module.css'

const CourseComparisonChart = () => {
  const courseData = [
    { course: 'Math', time: 20 },
    { course: 'History', time: 15 },
    { course: 'Science', time: 30 },
    { course: 'Literature', time: 10 },
    { course: 'Art', time: 25 },
  ];

  return (
    <div className={styles.Chart}>
      <h2>Study Time Comparison</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={courseData}>
          <XAxis dataKey="course" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="time" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CourseComparisonChart;
