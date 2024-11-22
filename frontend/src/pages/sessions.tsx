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
  const handleAddSession = (newSession: any) => {
    setSessions((prev) => [...prev, newSession]);
  };

  const studySessions = [
    { title: "Math Practice", plan: "Algebra", date: "2024-11-01", startTime: "2024-11-01T14:00:00Z", endTime: "2024-11-01T15:00:00Z", duration: 60 },
    { title: "Physics Review", plan: "Mechanics", date: "2024-11-02", startTime: "2024-11-02T16:30:00Z", endTime: "2024-11-02T17:15:00Z", duration: 45 },
    { title: "Chemistry Lab Prep", plan: "Organic Chemistry", date: "2024-11-03", startTime: "2024-11-03T09:00:00Z", endTime: "2024-11-03T10:30:00Z", duration: 90 },
    { title: "History Essay", plan: "World History", date: "2024-11-04", startTime: "2024-11-04T18:00:00Z", endTime: "2024-11-04T20:00:00Z", duration: 120 },
    { title: "Biology Study", plan: "Genetics", date: "2024-11-05", startTime: "2024-11-05T13:00:00Z", endTime: "2024-11-05T14:30:00Z", duration: 90 },
    { title: "English Essay", plan: "Literature", date: "2024-11-06", startTime: "2024-11-06T10:00:00Z", endTime: "2024-11-06T11:45:00Z", duration: 105 },
    { title: "Programming Practice", plan: "Data Structures", date: "2024-11-07", startTime: "2024-11-07T15:30:00Z", endTime: "2024-11-07T17:00:00Z", duration: 90 },
    { title: "Math Revision", plan: "Calculus", date: "2024-11-08", startTime: "2024-11-08T08:00:00Z", endTime: "2024-11-08T09:15:00Z", duration: 75 },
    { title: "Physics Quiz Prep", plan: "Electromagnetism", date: "2024-11-09", startTime: "2024-11-09T11:00:00Z", endTime: "2024-11-09T12:00:00Z", duration: 60 },
    { title: "Chemistry Review", plan: "Inorganic Chemistry", date: "2024-11-10", startTime: "2024-11-10T14:30:00Z", endTime: "2024-11-10T16:00:00Z", duration: 90 },
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
