import React, { useState } from 'react';

import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

import CourseList from '@/components/coursesList';
import CourseModal from '@/components/addCourseModal';

import styles from '@/styles/courses.module.css';

const coursesList = [
  {
    id: 1,
    name: 'Mathematics 101',
    description: 'An introductory course to fundamental mathematical concepts and problem-solving techniques.',
    schedule: 'Mon 9:00 AM - 11:00 AM',
    assignments: ['Assignment 1 - Due Nov 10', 'Assignment 2 - Due Nov 17'],
    studyPlans: ['Focus on Chapter 2', 'Practice exercises for Quiz'],
  },
  {
    id: 2,
    name: 'Physics 201',
    description: 'A comprehensive course on classical mechanics, including Newtonian physics and the laws of motion.',
    schedule: 'Tue 10:00 AM - 12:00 PM',
    assignments: ['Assignment 1 - Due Nov 12', 'Lab Report - Due Nov 18'],
    studyPlans: ['Review Newton’s Laws', 'Prepare for Lab Experiment'],
  },
  {
    id: 3,
    name: 'Computer Science 101',
    description: 'An introduction to computer science fundamentals, programming, and algorithms.',
    schedule: 'Mon 1:00 PM - 3:00 PM',
    assignments: ['Project 1 - Due Nov 15', 'Assignment 2 - Due Nov 22'],
    studyPlans: ['Complete Programming Assignment', 'Study Sorting Algorithms'],
  },
  {
    id: 4,
    name: 'Biology 101',
    description: 'An introductory course on biological concepts, including genetics, evolution, and ecology.',
    schedule: 'Tue 9:00 AM - 11:00 AM',
    assignments: ['Quiz 1 - Due Nov 13', 'Group Project - Due Nov 20'],
    studyPlans: ['Study for Quiz 1', 'Research for Group Project'],
  },
  {
    id: 5,
    name: 'History 102',
    description: 'A survey course covering key historical events from the Middle Ages to the Modern era.',
    schedule: 'Mon 3:00 PM - 5:00 PM',
    assignments: ['Essay 1 - Due Nov 16', 'Presentation - Due Nov 23'],
    studyPlans: ['Read Chapter 5', 'Prepare for Presentation'],
  },
];


const terms = [
  {name: "Fall 2024"},
  {name: "Spring 2025"},
  {name: "Summer 2025"},
  {name: "Winter 2025"}
]

const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddCourse = (newCourse: { id: number; name: string; description: string; schedule: string; assignments: string[]; studyPlans: string[]; }) => {
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

        <CourseList courses={coursesList} />

        <CourseModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          onAdd={handleAddCourse}
          terms={terms}
        />
        
      </main>
    </div>
  );
};


export default Courses;
