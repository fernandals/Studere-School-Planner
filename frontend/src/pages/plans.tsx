import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

import styles from '@/styles/plans.module.css';

import mockCourses from '@/utils/mockCourses.json'

const Plans = () => {
  const [theme, setTheme] = useState('');
  const [studyPlan, setStudyPlan] = useState('');

  const [course, setCourse] = useState('');

  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [studyPlans, setStudyPlans] = useState([]);

  useEffect(() => {
    if (selectedCourseName) {
      const selectedCourse = mockCourses.find(course => course.name === selectedCourseName);
      setStudyPlans(selectedCourse ? selectedCourse.studyPlans : []);
    }
  }, [selectedCourseName, mockCourses]);

  // Fetch courses (you can fetch these from an API or use hardcoded data)
  useEffect(() => {
    // Example: fetch courses from an API
    const fetchCourses = async () => {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourse(data);
    };

    fetchCourses();
  }, []);

  // Fetch study plans based on selected course
  useEffect(() => {
    if (course) {
      const fetchStudyPlans = async () => {
        const response = await fetch(`/api/study-plans?course=${course}`);
        const data = await response.json();
        setStudyPlans(data);
      };

      fetchStudyPlans();
    }
  }, [course]);

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

        <h1>Select a Course</h1>

        {/* Course selection dropdown */}
        <select onChange={(e) => setSelectedCourseName(e.target.value)} value={selectedCourseName}>
          <option value="">-- Select Course --</option>
          {mockCourses.map((course) => (
            <option key={course.id} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>

        {/* Display study plans for the selected course */}
        {selectedCourseName && (
          <div>
            <h3>Study Plans for {selectedCourseName}</h3>
            <ul>
              {studyPlans.map((plan, index) => (
                <li key={index}>
                  <h4>{plan.name}</h4>
                  <p>Completed: {plan.completed ? "Yes" : "No"}</p>
                  <p>Topics:</p>
                  <ul>
                    {plan.studyTopics.map((topic, idx) => (
                      <li key={idx}>{topic}</li>
                    ))}
                  </ul>
                  <p>Sessions:</p>
                  <ul>
                    {plan.studySessions.map((session, idx) => (
                      <li key={idx}>{session}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

      </main>
    </div>
  );
};

export default Plans;
