import React, { useState } from 'react';

import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

import CourseList from '@/components/coursesList';
import CourseModal from '@/components/courseModal';

import styles from '@/styles/courses.module.css';

const coursesList = [
  {
    id: 1,
    name: 'Mathematics 101',
    description: 'An introductory course to fundamental mathematical concepts and problem-solving techniques.',
    schedule: 'Mon 9:00 AM - 11:00 AM',
    term: 'Fall 2024',
    assignments: ['Assignment 1 - Due Nov 10', 'Assignment 2 - Due Nov 17'],
    studyPlans: ['Focus on Chapter 2', 'Practice exercises for Quiz'],
  },
  {
    id: 2,
    name: 'Physics 201',
    description: 'A comprehensive course on classical mechanics, including Newtonian physics and the laws of motion.',
    schedule: 'Tue 10:00 AM - 12:00 PM',
    term: 'Spring 2025',
    assignments: ['Assignment 1 - Due Nov 12', 'Lab Report - Due Nov 18'],
    studyPlans: ['Review Newton’s Laws', 'Prepare for Lab Experiment'],
  },
  {
    id: 3,
    name: 'Computer Science 101',
    description: 'An introduction to computer science fundamentals, programming, and algorithms.',
    schedule: 'Mon 1:00 PM - 3:00 PM',
    term: 'Summer 2025',
    assignments: ['Project 1 - Due Nov 15', 'Assignment 2 - Due Nov 22'],
    studyPlans: ['Complete Programming Assignment', 'Study Sorting Algorithms'],
  },
  {
    id: 4,
    name: 'Biology 101',
    description: 'An introductory course on biological concepts, including genetics, evolution, and ecology.',
    schedule: 'Tue 9:00 AM - 11:00 AM',
    term: 'Winter 2025',
    assignments: ['Quiz 1 - Due Nov 13', 'Group Project - Due Nov 20'],
    studyPlans: ['Study for Quiz 1', 'Research for Group Project'],
  },
  {
    id: 5,
    name: 'History 102',
    description: 'A survey course covering key historical events from the Middle Ages to the Modern era.',
    schedule: 'Mon 3:00 PM - 5:00 PM',
    term: 'Fall 2024', // Looping back to the first term
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
  const [currentCourse, setCurrentCourse] = useState(null); // To track which course is being edited

  const closeModal = () => setIsModalOpen(false);

  const handleCreateCourse = () => {
    setCurrentCourse(null);
    setIsModalOpen(true); // Open the modal for creating
  };

  const handleEditCourse = (course) => {
    setCurrentCourse(course);
    setIsModalOpen(true); // Open the modal for editing
  };

  // no useful code yet
  const handleSaveCourse = async (courseData) => {
    try {
        if (currentCourse) {
            // Editing an existing course
            const updatedCourse = await api.editCourse(currentCourse.id, courseData);
            setCourses((prevCourses) =>
                prevCourses.map((course) => (course.id === currentCourse.id ? updatedCourse : course))
            );
        } else {
            // Creating a new course
            const newCourse = await api.createCourse(courseData);
            setCourses((prevCourses) => [...prevCourses, newCourse]);
        }
    } catch (err) {
        console.error('Error saving course:', err);
    }
  };

  //no useful code yet
  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '200px', padding: '20px', flex: '1' }} className={styles.content}>
        
        <Header 
          title="Courses" 
          buttonText="Add New Course" 
          onButtonClick={handleCreateCourse} 
        />

        <CourseList 
          courses={coursesList}
          onEdit={handleEditCourse}
          onDelete={handleDeleteCourse}
        />

        <CourseModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveCourse}
          course={currentCourse}
          terms={terms}
        />
    
      </main>
    </div>
  );
};

export default Courses;
