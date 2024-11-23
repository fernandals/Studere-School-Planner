import { useState } from 'react';
import styles from '@/styles/addCourseModal.module.css';

export default function CourseModal({ isOpen, onClose, onAdd, terms }) {
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [term, setTerm] = useState('');

    const handleAdd = () => {
        if (courseName.trim() && courseDescription.trim() && term) {
            onAdd({ name: courseName, description: courseDescription, term });
            setCourseName('');
            setCourseDescription('');
            setTerm('');
            onClose();
        } else {
            alert('Please fill in all fields before adding the course.');
        }
    };

    const handleClose = () => {
        setCourseName('');
        setCourseDescription('');
        setTerm('');
        onClose();
    };

    if (!isOpen) return null; 

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={handleClose} aria-label="Close">
                    &times;
                </button>

                <h2 className={styles.title}>Add New Course</h2>
                
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAdd();
                    }}
                >
                    {/* Course Name */}
                    <div className={styles.entry}>
                        <label htmlFor="courseName" className={styles.label}>Course Name</label>
                        <input
                            id="courseName"
                            type="text"
                            placeholder="Enter course name"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            className={styles.inputBox}
                        />
                    </div> 

                    {/* Course Description */}
                    <div className={styles.entry}>
                        <label htmlFor="courseDescription" className={styles.label}>Description</label>
                        <textarea
                            id="courseDescription"
                            placeholder="Enter course description"
                            value={courseDescription}
                            onChange={(e) => setCourseDescription(e.target.value)}
                            className={styles.textareaBox}
                        />
                    </div>

                    {/* Term Selection */}
                    <div className={styles.entry}>
                        <label htmlFor="term" className={styles.label}>Term</label>
                        <select
                            id="term"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
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
                        <button type="submit" className={styles.button}>Add Course</button>
                    </div>
                    
                </form>

            </div>
        </div>
    );
}
