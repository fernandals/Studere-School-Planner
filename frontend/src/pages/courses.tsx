import React, { useState } from 'react';

import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

import CourseList from '@/components/coursesList';
import AddCourseModal from '@/components/addCourseModal';

import styles from '@/styles/courses.module.css';

const sampleCourses = [
  {
      id: 1,
      name: 'Mathematics 101',
      schedule: 'Mon/Wed/Fri - 9:00 AM to 10:30 AM',
      room: 'Room 204, Building A',
      assignments: ['Assignment 1 - Due Nov 10', 'Assignment 2 - Due Nov 17'],
      studyPlans: ['Focus on Chapter 2', 'Practice exercises for Quiz', 'fndskjlngsjkdfngkjsdnfgjsd', 'jndfkjdnsfgjkndsfkjgnskdjfngkdjfn'],
  },
  {
    id: 2,
    name: 'Biology 101',
    schedule: 'Tue/Fri - 1:00 PM to 2:30 PM',
    room: 'Room 104, Building B',
    assignments: ['Assignment 1 - Due Nov 8', 'Assignment 2 - Due Dec 19'],
    studyPlans: ['Focus on Chapter 2', 'Practice exercises for Quiz'],
  },
  {
    id: 3,
    name: 'Test 101',
    schedule: 'Tue/Fri - 1:00 PM to 2:30 PM',
    room: 'Room 104, Building B',
    assignments: ['Assignment 1 - Due Nov 8', 'Assignment 2 - Due Dec 19'],
    studyPlans: ['Focus on Chapter 2', 'Practice exercises for Quiz'],
  },
  {
    id: 4,
    name: 'Lucas 101',
    schedule: 'Tue/Fri - 1:00 PM to 2:30 PM',
    room: 'Room 104, Building B',
    assignments: ['Assignment 1 - Due Nov 8', 'Assignment 2 - Due Dec 19'],
    studyPlans: ['Focus on Chapter 2', 'Practice exercises for Quiz'],
  },
  {
    id: 5,
    name: 'Rock n Roll 101',
    schedule: 'Tue/Fri - 1:00 PM to 2:30 PM',
    room: 'Room 104, Building B',
    assignments: ['Assignment 1 - Due Nov 8', 'Assignment 2 - Due Dec 19'],
    studyPlans: ['Focus on Chapter 2', 'Practice exercises for Quiz'],
  },
];

const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([
      {
          id: 1,
          name: 'Mathematics 101',
          schedule: 'Mon/Wed/Fri - 9:00 AM to 10:30 AM',
          room: 'Room 204, Building A',
          assignments: ['Assignment 1 - Due Nov 10', 'Assignment 2 - Due Nov 17'],
          studyPlans: ['Focus on Chapter 2', 'Practice exercises for Quiz'],
      },
      // Add more courses as needed
  ]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddCourse = (newCourse: { id: number; name: string; schedule: string; room: string; assignments: string[]; studyPlans: string[]; }) => {
      setCourses([...courses, newCourse]);
  };

    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ marginLeft: '200px', padding: '20px', flex: '1' }} className={styles.content}>
          
          <Header 
            title="Courses" 
            buttonText="Add New Course" 
            onButtonClick={openModal} 
          />

          <CourseList courses={sampleCourses} />;

          <AddCourseModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            onAdd={handleAddCourse}
          />
          
        </main>
      </div>
    );
};


export default Courses;
