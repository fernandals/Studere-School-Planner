import React, { useState, useEffect } from 'react';
import styles from '@/styles/courseModal.module.css'; 

const AssignmentModal = ({ isOpen, onClose, onSave, assignment, mode }) => {
    const [assignmentData, setAssignmentData] = useState({
        title: '',
        type: '',
        score: '',
        dueAt: '',
        description: '',
    });
    
    useEffect(() => {
        if (assignment) {
            let formattedDueAt = '';
    
            // Convert dueAt if it's in ISO format
            if (assignment.dueAt) {
                formattedDueAt = new Date(assignment.dueAt).toISOString().split('T')[0]; // Formats to YYYY-MM-DD
            }
    
            setAssignmentData({
                title: assignment.title,
                type: assignment.type,
                score: assignment.score,
                dueAt: formattedDueAt,
                description: assignment.description,
            });
        }
    }, [assignment, mode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAssignmentData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        if (
            assignmentData.title.trim() && 
            assignmentData.type.trim() && 
            assignmentData.score.trim() && 
            assignmentData.dueAt.trim()
        ) {
            const updatedAssignment = { 
                id: assignment?.id || Date.now(), 
                ...assignmentData 
            };
  
            onSave(updatedAssignment);
            handleClose();
        } else {
            alert('Please fill in all fields before saving the assignment.');
        }
    };
  
    const handleClose = () => {
        setAssignmentData({
            title: '',
            type: '',
            score: '',
            dueAt: '',
            description: '',
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

                <h2 className={styles.title}>{mode === 'view' ? 'Assignment Details' : (assignment ? 'Edit Assignment' : 'Create Assignment')}</h2>
                
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (mode !== 'view') handleSave();
                    }}
                >
                    {/* Assignment Title */}
                    <div className={styles.entry}>
                        <label htmlFor="assignmentTitle" className={styles.label}>Title</label>
                        <input
                            id="assignmentTitle"
                            name="title"
                            type="text"
                            placeholder="Enter assignment title"
                            value={assignmentData.title}
                            onChange={handleInputChange}
                            disabled={mode === 'view'}
                            className={styles.inputBox}
                        />
                    </div> 

                    {/* Assignment Description */}
                    <div className={styles.entry}>
                        <label htmlFor="assignmentDescription" className={styles.label}>Description</label>
                        <textarea
                            id="assignmentDescription"
                            name="description"
                            placeholder="Enter assignment description"
                            value={assignmentData.description}
                            onChange={handleInputChange}
                            disabled={mode === 'view'}
                            className={styles.textareaBox}
                        />
                    </div>

                    {/* Assignment Due Date */}
                    <div className={styles.entry}>
                        <label htmlFor="assignmentDueDate" className={styles.label}>Due Date</label>
                        <input
                            id="assignmentDueDate"
                            name="dueAt"
                            type="date"
                            value={assignmentData.dueAt}
                            onChange={handleInputChange}
                            disabled={mode === 'view'}
                            className={styles.inputBox}
                        />
                    </div> 

                    {/* Assignment Type */}
                    <div className={styles.entry}>
                        <label htmlFor="assignmentType" className={styles.label}>Type</label>
                        <input
                            id="assignmentType"
                            name="type"
                            type="text"
                            placeholder="e.g. Homework, Quiz"
                            value={assignmentData.type}
                            onChange={handleInputChange}
                            disabled={mode === 'view'}
                            className={styles.inputBox}
                        />
                    </div>

                    {/* Assignment Score */}
                    <div className={styles.entry}>
                        <label htmlFor="assignmentScore" className={styles.label}>Score</label>
                        <input
                            id="assignmentScore"
                            name="score"
                            type="number"
                            placeholder="Enter score"
                            value={assignmentData.score}
                            onChange={handleInputChange}
                            disabled={mode === 'view'}
                            className={styles.inputBox}
                        />
                    </div>

                    {/* Button */}
                    {mode !== 'view' && (
                        <div className={styles.buttonContainer}>
                            <button type="submit" className={styles.button}>{assignment ? 'Save Assignment' : 'Create Assignment'}</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AssignmentModal;
