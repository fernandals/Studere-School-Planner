import React, { useState, useEffect } from 'react';

import styles from '@/styles/topicModal.module.css'

export default function CreateTopicModal({ isOpen, onClose, topic }) {
  const [topicData, setTopicData] = useState({
    name: '',
    description: '',
    completed: false,
    notes: '',
  });

  useEffect(() => {
    if (topic) {
        setTopicData({
            name: topic.name,
            description: topic.description,
            completed: topic.completed,
            notes: topic.notes,
        });
    }
  }, [topic]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTopicData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (
        topicData.name.trim() && 
        topicData.description.trim()
    ) {
        const updatedTopic = { 
            id: topic?.id || Date.now(), 
            ...topicData 
        };

        onSave(updatedTopic);
        handleClose();
    } else {
        alert('Please fill in all fields before saving the topic.');
    }
  };

  const handleClose = () => {
    setTopicData({
      name: '',
      description: '',
      completed: false,
      notes: '',
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
    
        <h2 className={styles.title}>{topic ? 'Edit Topic' : 'Create Topic'}</h2>
          
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSave();
            }}
        >
          {/* Topic Name */}
          <div className={styles.entry}>
            <label htmlFor="topicName" className={styles.label}>Topic Name</label>
            <input
              id="topicName"
              name="name"
              type="text"
              placeholder="Enter topic name"
              value={topicData.name}
              onChange={handleInputChange}
              className={styles.inputBox}
            />
          </div> 

          {/* should i keep it? 
          <div className={styles.entry}>
            <label htmlFor="topicDescription" className={styles.label}>Description</label>
            <textarea
              id="topicDescription"
              name="description"
              placeholder="Enter topic description"
              value={topicData.description}
              onChange={handleInputChange}
              className={styles.textareaBox}
            />
          </div>
          */}

          <div className={styles.entry}>
            <label htmlFor="topicNotes" className={styles.label}>Notes</label>
            <textarea
              id="topicNotes"
              name="notes"
              placeholder="Add topic notes"
              value={topicData.notes}
              onChange={handleInputChange}
              className={styles.textareaBox}
            />
          </div>

          <div className={styles.entry}>
            <label htmlFor="topicComplete" className={styles.label}>Mark to Complete</label>
            <div className={styles.checkboxWrapper}>
              <input
                id="topicComplete"
                name="completed"
                type="checkbox"
                checked={topicData.completed}
                onChange={() => handleTopicCompletion(index)}
                className={styles.checkbox}
              />
              <span className={styles.checkboxLabel}>Completed</span>
            </div>
          </div>

          {/* Add Topic Button */}
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button} >Add Topic</button>
          </div>                
        </form>
      </div>
    </div>
  )

}