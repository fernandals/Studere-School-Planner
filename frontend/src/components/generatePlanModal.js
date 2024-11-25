import React, { useState, useEffect } from 'react';

import styles from '@/styles/generatePlanModal.module.css'

export default function GeneratePlanModal({ isOpen, onClose, onSave }) {
  const [theme, setTheme] = useState('');
  const [studyPlan, setStudyPlan] = useState('');
  const [planData, setPlanData] = useState({
    name: '',
    topics: [],
    sessions: [],
  });

  const fetchStudyPlan = (theme) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mocking a study plan based on the theme input
        const mockResponse = `
          Study Plan for: ${theme}
  
          - Review key concepts.
          - Create a study schedule.
          - Break down the material into manageable chunks.
          - Focus on difficult topics for 40 minutes, followed by a 5-minute break.
          - Repeat until mastery of the subject is achieved.
  
          This plan is tailored based on your theme and study needs.
        `;
  
        // Split the response into an array of lines, removing the first and last lines (for header/footer)
        const topics = mockResponse
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.startsWith('-')); 
  
        console.log(mockResponse.split('\n').map(line => line.trim()).filter(line => line.startsWith('-')));
        resolve(topics); // Return the list of topics
      }, 1000); // Simulate a 1-second delay
    });
  };  

  const handleSubmit = () => {
    // Make a call to GPT to generate the study plan based on the theme
    // Assume fetchStudyPlan is a function that calls GPT or your API
    fetchStudyPlan(theme).then(plan => setStudyPlan(plan));
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
    
        <h2 className={styles.title}>Generate Your Plan</h2>
          
        <p className={styles.instructions}>
          Describe the topic or focus of your study plan, and we’ll help you create a personalized study schedule with <strong>ChatGPT</strong>.
        </p>
        
        <textarea
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Enter the theme of your study plan"
          className={styles.textareaBox}
        />

        <div className={styles.buttonContainer}>
          <button onClick={handleSubmit} className={styles.button}>
            Generate Study Plan
          </button>
        </div>
        
        {studyPlan && (
          <div className={styles.studyPlanResult}>
            <h3>Your Generated Study Topics</h3>
            <ul className={styles.studyPlanList}>
              {studyPlan.map((topic, index) => (
                <li key={index} className={styles.studyPlanItem}>
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  )

}