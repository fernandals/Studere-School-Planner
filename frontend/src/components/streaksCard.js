import React, { useState, useEffect } from 'react';

import { FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";

import styles from '@/styles/dashboard.module.css';

const StreaksCard = () => {
  const [streakData, setStreakData] = useState([true, true, false, true, true, false, true]); // Example data for last 7 days

  const streakCount = streakData.filter((studied) => studied).length; // Count how many days the user studied

  return (
    <div className={styles.card}>
      <h2>Streaks</h2>
      <p>Your track record in the last 7 days:</p>
      <div className={styles.streaksContainer}>
        {streakData.map((studied, index) => (
          <div key={index} className={styles.streakIcon}>
            {studied ? <FaRegCircleCheck size={30} color="#28a745" /> : <FaRegCircle size={30} color="#ddd" />}
          </div>
        ))}
      </div>
      {/*<p>🔥 {streakCount} days</p>*/}
    </div>
  );
};

export default StreaksCard;
