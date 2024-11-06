import { useState } from 'react';
import styles from '@/styles/addCourseModal.module.css';

export default function AddCourseModal({ isOpen, onClose, onAdd }) {
    const [courseName, setCourseName] = useState('');
    const [semester, setSemester] = useState('');

    if (!isOpen) return null; // Do not render if modal is closed

    const handleAdd = () => {
        onAdd({ name: courseName, semester });
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Add New Course</h2>
                <input
                    type="text"
                    placeholder="Course Name"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className={styles.inputBox}
                />
                <input
                    type="text"
                    placeholder="Semester"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className={styles.inputBox}
                />
                <button onClick={handleAdd} className={styles.button}>Add Course</button>
                <button onClick={onClose} className={styles.closeButton}>Close</button>
            </div>
        </div>
    );
}
