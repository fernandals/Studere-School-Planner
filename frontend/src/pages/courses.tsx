import React, { useEffect, useState } from 'react';
import { API_URL } from '@/config';

import axios from 'axios';

import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import CourseList from '@/components/courseList';
import CourseModal from '@/components/courseModal';
import AssignmentModal from '@/components/assignmnetModal';

import styles from '@/styles/courses.module.css';

import mockCourses from "@/utils/mockCourses.json";
import mockTerms from "@/utils/mockTerms.json";

const Courses = () => {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);

  const [assignemntModalMode, setAssignmentModalMode] = useState('create'); // 'create', 'edit', or 'view'

  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null); // To track which course is being edited
  const [currentAssignment, setCurrentAssignment] = useState(null); // To track which assignment is being edited

  const [termList, setTermList] = useState([]);

  const closeCourseModal = () => setIsCourseModalOpen(false);
  const closeAssignmentModal = () => setIsAssignmentModalOpen(false);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {

      const headers = {
        "Authorization": `Bearer ${localStorage.getItem('authToken')}`
      }

      const response = await axios.get(`${API_URL}/terms`, { headers: headers });
      
      setTermList(response.data)
    } catch (err) {
      console.error('Error fetching terms:', err);
    } finally {
      console.log('Terms List', termList);
    }
  };

  {/* Course Utils */}
  const handleCreateCourse = () => {
    setCurrentCourse(null); 
    setIsCourseModalOpen(true); // Open the modal for creating
  };

  const handleEditCourse = (course) => {
    setCurrentCourse(course);
    setIsCourseModalOpen(true); // Open the modal for editing
  };

  const handleSaveCourse = async (courseData) => {
    try {
      const requestBody = {
        "name": courseData.name,
        "description": courseData.description,
        "schedule": courseData.schedule,
        "term": courseData.term,
      }

      console.log(requestBody);
      
      const headers = {
        "Authorization": `Bearer ${localStorage.getItem('authToken')}`
      }

      const response = await axios.post(`${API_URL}/course`, requestBody, { headers: headers });
      
      if (response.status === 201) {
        alert("Course created successfully");
        closeCourseModal(); 
      }

    } catch (err) {
        console.error('Error saving term:', err);
    }
  };

  //no useful code yet
  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  {/* Assignment Utils */}
  const handleCreateAssignment = () => {
    setAssignmentModalMode('create');
    setCurrentAssignment(null);
    setIsAssignmentModalOpen(true); // Open the modal for creating
  };

  const handleEditAssignment = (assignment) => {
    setAssignmentModalMode('edit');
    setCurrentAssignment(assignment);
    setIsAssignmentModalOpen(true); // Open the modal for editing
  };

  const openViewModal = (assignment) => {
    setAssignmentModalMode('view');
    setCurrentAssignment(assignment);
    setIsAssignmentModalOpen(true);
};

  const handleSaveAssignment = async (assignment) => {
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
          courses={mockCourses}
          onEdit={handleEditCourse}
          onDelete={handleDeleteCourse}
          onCreateAss={handleCreateAssignment}
          onEditAss={handleEditAssignment}
          onViewAss={openViewModal}
        />

        <CourseModal
          isOpen={isCourseModalOpen}
          onClose={closeCourseModal}
          onSave={handleSaveCourse}
          course={currentCourse}
          terms={termList}
        />

        <AssignmentModal
          isOpen={isAssignmentModalOpen}
          onClose={closeAssignmentModal}
          onSave={handleSaveAssignment}
          assignment={currentAssignment}
          mode={assignemntModalMode}
        />
    
      </main>
    </div>
  );
};

export default Courses;
