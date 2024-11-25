import React, { useState, useEffect } from 'react';

import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import StudyPlanList from '@/components/studyPlanList';
import CreatePlanModal from '@/components/createPlanModal'
import GeneratePlanModal from '@/components/generatePlanModal'
import TopicModal from '@/components/topicModal'
import SessionModal from '@/components/sessionModal'

import styles from '@/styles/plans.module.css';

import mockCourses from '@/utils/mockCourses.json'

const Plans = () => {
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [studyPlans, setStudyPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  const [currentTopic, setCurrentTopic] = useState(null)
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);

  const [currentSession, setCurrentSession] = useState(null)
  const [isSessionModalOpen, setIsSesionModalOpen] = useState(false);

  const closeCreateModal = () => setIsCreateModalOpen(false);
  const closeGenerateModal = () => setIsGenerateModalOpen(false);
  const closeTopicModal = () => setIsTopicModalOpen(false);
  const closeSessionModal = () => setIsSesionModalOpen(false);

  const handleSavePlan = (newPlan: any) => {
    
  };

  const handleCreatePlan = () => {
    setCurrentPlan(null);
    setIsCreateModalOpen(true); // Open the modal for creating
  };

  const handleGeneratePlan = () => {
    setCurrentPlan(null);
    setIsGenerateModalOpen(true); // Open the modal for creating
  };

  const handleEditPlan = (plan) => {
    setCurrentPlan(plan);
    setIsCreateModalOpen(true); // Open the modal for editing
  };

  const handleCreateTopic = () => {
    setCurrentTopic(null);
    setIsTopicModalOpen(true); // Open the modal for creating
  };

  const handleEditTopic = (topic) => {
    setCurrentTopic(topic);
    setIsTopicModalOpen(true); // Open the modal for editing
  };

  const handleCreateSession = () => {
    setCurrentSession(null);
    setIsSesionModalOpen(true); // Open the modal for creating
  };

  const handleEditSession = (session) => {
    setCurrentSession(session);
    setIsSesionModalOpen(true); // Open the modal for editing
  };

  useEffect(() => {
    if (selectedCourseName) {
      const selectedCourse = mockCourses.find(course => course.name === selectedCourseName);
      setStudyPlans(selectedCourse ? selectedCourse.studyPlans : []);
    }
  }, [selectedCourseName, mockCourses]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '200px', padding: '20px', flex: '1' }} className={styles.content}>

        <Header 
          title="Study Plans" 
          buttonText={undefined} 
          onButtonClick={undefined} 
        />

        <div className={styles.courseSelection}>
          <h3 className={styles.subtitle}>Select a Course</h3>
          
          <select 
            onChange={(e) => setSelectedCourseName(e.target.value)} 
            value={selectedCourseName} 
            className={styles.courseSelect}
          >
            <option value="">-- Select Course --</option>
            {mockCourses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>

          {/* buttons can only work if course selected */}
          <button 
            className={`${styles.createButton} ${!selectedCourseName && styles.disabledButton}`}
            onClick={selectedCourseName ? handleCreatePlan : undefined}
            disabled={!selectedCourseName} /* Disables the button */
          >
            Create a Plan
          </button>
          <button 
            className={`${styles.generateButton} ${!selectedCourseName && styles.disabledButton}`}
            onClick={selectedCourseName ? handleGeneratePlan : undefined}
            disabled={!selectedCourseName} /* Disables the button */
          >
            Generate a Plan with ChatGPT
          </button>
          
        </div>

        {selectedCourseName && (
          <StudyPlanList 
            plans={studyPlans}
            onEdit={handleEditPlan}
            createTopic={handleCreateTopic}
            editTopic={handleEditTopic}
            createSession={handleCreateSession}
            editSession={handleEditSession}
          />
        )}

        <CreatePlanModal 
          isOpen={isCreateModalOpen} 
          onClose={closeCreateModal} 
          onSave={handleSavePlan}
          plan={currentPlan}
        />

        <GeneratePlanModal 
          isOpen={isGenerateModalOpen} 
          onClose={closeGenerateModal} 
          onSave={handleSavePlan}
        />

        <TopicModal
          isOpen={isTopicModalOpen}
          onClose={closeTopicModal}
          topic={currentTopic}
        />

        <SessionModal
          isOpen={isSessionModalOpen}
          onClose={closeSessionModal}
          onEdit={undefined}
          onAdd={undefined}
          session={currentSession}
          plans={[]}
        />

      </main>
    </div>
  );
};

export default Plans;
