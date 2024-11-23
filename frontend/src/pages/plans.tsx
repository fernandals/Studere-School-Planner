import React, { useState } from 'react';

import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

import styles from '@/styles/plans.module.css';

const Plans = () => {
  const [theme, setTheme] = useState('');
  const [studyPlan, setStudyPlan] = useState('');

  // Simulated fetchStudyPlan function to mock GPT response
  const fetchStudyPlan = (theme: string) => {
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
        resolve(mockResponse);
      }, 1000); // Simulate a 1-second delay
    });
  };

  const handleSubmit = () => {
    // Make a call to GPT to generate the study plan based on the theme
    // Assume fetchStudyPlan is a function that calls GPT or your API
    fetchStudyPlan(theme).then(plan => setStudyPlan(plan));
  };
  
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ marginLeft: '200px', padding: '20px', flex: '1' }} className={styles.content}>

          <Header 
            title="Study Plans" 
            buttonText={undefined} 
            onButtonClick={undefined} 
          />

          <div className={styles.studyPlanGenerator}>
              <h2 className={styles.heading}>Generate Your Study Plan</h2>
              <p className={styles.instructions}>
                Describe the topic or focus of your study plan, and we’ll help you create a personalized study schedule.
              </p>
              <textarea
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="Enter the theme of your study plan"
                className={styles.themeTextbox}
              />
              <button onClick={handleSubmit} className={styles.generateButton}>
                Generate Study Plan
              </button>
              
              {studyPlan && (
                <div className={styles.studyPlanResult}>
                  <h3>Your Generated Study Plan</h3>
                  <p>{studyPlan}</p>
                </div>
              )}
            </div>

        </main>
      </div>
    );
};

export default Plans;
