import Sidebar from '@/components/sidebar';
import SessionList from "@/components/sessionList";

import styles from '@/styles/sessions.module.css';

const Sessions = () => {
  const studySessions = [
    { title: "Math Practice", course: "Math", date: "2024-11-01", duration: 60 },
    { title: "Physics Review", course: "Physics", date: "2024-11-02", duration: 45 },
    { title: "Chemistry Lab Prep", course: "Chemistry", date: "2024-11-03", duration: 90 },
    { title: "History Essay", course: "History", date: "2024-11-04", duration: 120 },
    { title: "History Essay", course: "History", date: "2024-11-04", duration: 120 },
    { title: "History Essay", course: "History", date: "2024-11-04", duration: 120 },
    { title: "History Essay", course: "History", date: "2024-11-04", duration: 120 },
    { title: "History Essay", course: "History", date: "2024-11-04", duration: 120 },
    { title: "History Essay", course: "History", date: "2024-11-04", duration: 120 },
    { title: "History Essay", course: "History", date: "2024-11-04", duration: 120 },
    { title: "History Essay", course: "History", date: "2024-11-04", duration: 120 },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '200px', padding: '20px', flex: '1' }}>
        
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Sessions</h1>

          <button className={styles.newSessionBtt}>
            Create Session
          </button>
        </div>

        <div style={{ padding: '50px', display: 'flex', justifyContent: 'center' }}>
          <SessionList sessions={studySessions} />
        </div>
        
      </div>
      
      </main>
    </div>
  );
};

export default Sessions;
