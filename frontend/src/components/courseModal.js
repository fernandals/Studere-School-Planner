import React, { useState, useEffect } from 'react';

import styles from '@/styles/courseModal.module.css'; 

const CourseModal = ({ isOpen, onClose, onSave, course, terms }) => {
    const [courseData, setCourseData] = useState({
        name: '',
        description: '',
        schedule: '',
        term: '',
        assignments: [],
        plans: [],
    });

    useEffect(() => {
        if (course) {
            setCourseData({
                name: course.name,
                description: course.description,
                schedule: course.schedule,
                term: course.term,
                assignments: course.assignments,
                plans: course.plans,
            });
        }
    }, [course]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleClose = () => {
      setCourseData({
        name: '',
        description: '',
        schedule: '',
        term: '',
        assignments: [],
        plans: [],
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

          <h2 className={styles.title}>{course ? 'Edit Course' : 'Create Course'}</h2>
            
          <form
              onSubmit={(e) => {
                  e.preventDefault();
                  onSave(courseData);
              }}
          >
            {/* Course Name */}
            <div className={styles.entry}>
              <label htmlFor="courseName" className={styles.label}>Course Name</label>
              <input
                id="courseName"
                name="name"
                type="text"
                placeholder="Enter course name"
                value={courseData.name}
                onChange={handleInputChange}
                className={styles.inputBox}
              />
            </div> 

            {/* Course Description */}
            <div className={styles.entry}>
              <label htmlFor="courseDescription" className={styles.label}>Description</label>
              <textarea
                id="courseDescription"
                name="description"
                placeholder="Enter course description"
                value={courseData.description}
                onChange={handleInputChange}
                className={styles.textareaBox}
              />
            </div>

            {/* Course Schedule */}
            <div className={styles.entry}>
              <label htmlFor="courseSchedule" className={styles.label}>Course Schedule</label>
              <input
                id="courseSchedule"
                name="schedule"
                type="text"
                placeholder="e.g. 24M56"
                value={courseData.schedule}
                onChange={handleInputChange}
                className={styles.inputBox}
              />
            </div> 

            {/* Term Selection */}
            <div className={styles.entry}>
              <label htmlFor="term" className={styles.label}>Term</label>
              <select
                id="term"
                name="term"
                value={courseData.term}
                onChange={handleInputChange}
                className={styles.selectBox}
              >
                <option value="">Select a Term</option>
                {terms.map((term) => (
                  <option key={term.name} value={term.name}>{term.name}</option>
                ))}
              </select>
            </div> 

            {/* Add Course Button */}
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.button} >Add Course</button>
            </div>                
          </form>
        </div>
      </div>
    );
};

export default CourseModal;
