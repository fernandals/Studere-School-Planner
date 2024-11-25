import React, { useState, useEffect } from 'react';

import styles from '@/styles/topicModal.module.css'; 

const TermModal = ({ isOpen, onClose, onSave }) => {
  const [termData, setTermData] = useState({
    id: null,
    name: null,
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    if (isOpen) {
      setTermData({
        name: '',
        startDate: '',
        endDate: '',
      });
    }
  }, [isOpen]);
  

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setTermData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleClose = () => {
    setTermData({
      name: '',
      description: '',
      schedule: '',
      term: '',
      assignments: [],
      studyPlans: [],
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={handleClose} aria-label="Close">
            &times;
        </button>

        <h2 className={styles.title}>Create Term</h2>
          
          <form onSubmit={(e) => {e.preventDefault(); onSave(termData);}}>
         <div className={styles.entry}>
            <label htmlFor="TermName" className={styles.label}>Term Name</label>
            <input
              id="TermName"
              name="name"
              type="text"
              placeholder="Enter Term name"
              value={termData.name}
              onChange={handleInputChange}
              className={styles.inputBox}
              required={true}
            />
          </div> 

          <div className={styles.entry}>
            <label htmlFor="startDate" className={styles.label}>Start Date</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              placeholder="Enter Start Date"
              value={termData.startDate}
              onChange={handleInputChange}
              className={styles.inputBox}
              required={true}
            />
          </div>

          <div className={styles.entry}>
            <label htmlFor="endDate" className={styles.label}>End Date</label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              placeholder="Enter End Date"
              value={termData.endDate}
              onChange={handleInputChange}
              className={styles.inputBox}
              required={true}
            />
          </div>

          {/* Add Term Button */}
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>Add Term</button>
          </div>
          </form>
      </div>
    </div>
  );
};

export default TermModal;
