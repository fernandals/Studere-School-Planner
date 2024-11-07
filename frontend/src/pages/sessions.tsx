import { useState, useEffect } from 'react';

import Sidebar from '@/components/sidebar';

import styles from '@/styles/sessions.module.css';

const Sessions = () => {
  const [sessionName, setSessionName] = useState('');
  const [tags, setTags] = useState('');
  const [notes, setNotes] = useState('');
  const [timer, setTimer] = useState(1500); // 25 minutes in seconds for Pomodoro
  const [isActive, setIsActive] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setIsActive(false);
      setCompletedCycles((prev) => prev + 1);
      setTimer(1500); // Reset to 25 minutes for a new cycle
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  // Format timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Session registration handler
  const handleRegisterSession = () => {
    // Here, implement the logic to save session data to your backend
    console.log('Session Registered:', {
      sessionName,
      tags,
      notes,
      completedCycles,
      totalTime: completedCycles * 25 + timer / 60,
    });
    setSessionName('');
    setTags('');
    setNotes('');
    setCompletedCycles(0);
    setTimer(1500); // Reset timer
  };

    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ marginLeft: '250px', padding: '20px', flex: '1' }}>
          
        <div className={styles.container}>
          <h1 className={styles.header}>Study Session</h1>
          <form className={styles.form}>
            <label className={styles.label}>Session Name:</label>
            <input
              type="text"
              className={styles.input}
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              required
            />
            <label className={styles.label}>Tags:</label>
            <input
              type="text"
              className={styles.input}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <label className={styles.label}>Notes:</label>
            <textarea
              className={styles.textarea}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </form>

          <div className={styles.timerContainer}>
            <h2 className={styles.timerDisplay}>{formatTime(timer)}</h2>
            <div className={styles.buttonGroup}>
              <button
                className={styles.button}
                onClick={() => setIsActive(!isActive)}
              >
                {isActive ? 'Pause' : 'Start'}
              </button>
              <button
                className={styles.button}
                onClick={() => setTimer(1500)}
              >
                Reset Timer
              </button>
            </div>
            <p>Completed Cycles: {completedCycles}</p>
          </div>

          <button className={styles.registerButton} onClick={handleRegisterSession}>
            Register Session
          </button>
        </div>

        </main>
      </div>
    );
};

export default Sessions;
