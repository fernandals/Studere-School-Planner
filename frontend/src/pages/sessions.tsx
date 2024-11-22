import { useState } from 'react';

import Sidebar from '@/components/sidebar';
import SessionList from "@/components/sessionList";
import SessionModal from '@/components/addSessionModal'; // Import the modal

import styles from '@/styles/sessions.module.css';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  //dont really know what to do
  const handleAddSession = (newSession) => {
    setSessions((prev) => [...prev, newSession]);
  };

  const studySessions = [
    { title: "Math Practice", plan: "Math", date: "2024-11-01", duration: 60 },
    { title: "Physics Review", plan: "Physics", date: "2024-11-02", duration: 45 },
    { title: "Chemistry Lab Prep", plan: "Chemistry", date: "2024-11-03", duration: 90 },
    { title: "History Essay", plan: "History", date: "2024-11-04", duration: 120 },
    { title: "History Essay", plan: "History", date: "2024-11-04", duration: 120 },
    { title: "History Essay", plan: "History", date: "2024-11-04", duration: 120 },
    { title: "History Essay", plan: "History", date: "2024-11-04", duration: 120 },
    { title: "History Essay", plan: "History", date: "2024-11-04", duration: 120 },
    { title: "History Essay", plan: "History", date: "2024-11-04", duration: 120 },
    { title: "History Essay", plan: "History", date: "2024-11-04", duration: 120 },
    { title: "History Essay", plan: "History", date: "2024-11-04", duration: 120 },
  ];

  const plans = [
    { name: "Math Plan", topics: ["Algebra", "Geometry", "Trigonometry"] },
    { name: "Science Plan", topics: ["Physics", "Chemistry", "Biology"] },
    { name: "History Plan", topics: ["Ancient", "Medieval", "Modern"] },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '200px', padding: '20px', flex: '1' }}>
        
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Sessions</h1>

          <button className={styles.newSessionBtt} onClick={toggleModal}>
            Create Session
          </button>
        </div>

        <SessionModal 
          isOpen={isModalOpen} 
          onClose={toggleModal} 
          onAdd={handleAddSession}
          plans={plans}
          />

        <div style={{ padding: '50px', display: 'flex', justifyContent: 'center' }}>
          <SessionList sessions={studySessions} />
        </div>       
        
      </div>
      
      </main>
    </div>
  );
};

export default Sessions;
