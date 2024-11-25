import React, { useState, useEffect } from 'react';

import styles from '@/styles/createPlanModal.module.css'

export default function CreatePlanModal({ isOpen, onClose, onSave, plan }) {
  const [planData, setPlanData] = useState({
    name: '',
    topics: [],
    sessions: [],
  });

  useEffect(() => {
    if (plan) {
        setPlanData({
            name: plan.name,
            assignments: plan.topics,
            studyPlans: plan.sessions,
        });
    }
  }, [plan]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlanData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (
        planData.name.trim() && 
        planData.description.trim() && 
        planData.schedule.trim() && 
        planData.term.trim()
    ) {
        const updatedPlan = { 
            id: plan?.id || Date.now(), 
            ...planData 
        };

        onSave(updatedPlan);
        handleClose();
    } else {
        alert('Please fill in all fields before saving the plan.');
    }
  };

  const handleClose = () => {
    setPlanData({
      name: '',
      topics: [],
      sesions: [],
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={handleClose} title="Close">
            &times;
        </button>
    
        <h2 className={styles.title}>{plan ? 'Edit Plan' : 'Create Plan'}</h2>
          
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSave();
            }}
        >
          {/* Plan Name */}
          <div className={styles.entry}>
            <label htmlFor="planName" className={styles.label}>Plan Name</label>
            <input
              id="planName"
              name="name"
              type="text"
              placeholder="Enter plan name"
              value={planData.name}
              onChange={handleInputChange}
              className={styles.inputBox}
            />
          </div> 
    
          {/* Add Plan Button */}
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button} >Add Plan</button>
          </div>                
        </form>
      </div>
    </div>
  )

}