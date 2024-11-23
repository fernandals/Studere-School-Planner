import { useState } from 'react';
import { FaPen, FaTrashAlt } from 'react-icons/fa';

import styles from '@/styles/courseCard.module.css';

export default function CourseCard({ course, onEdit, onDelete }) {
    const { id, name, description, schedule, term, assignments, studyPlans } = course;
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className={`${styles.courseCard} ${isExpanded ? styles.expanded : styles.collapsed}`}>
            {/* Card Header */}
            <div className={styles.cardHeader}>

                <div className={styles.actions}>
                    <button onClick={() => onEdit(course)} className={styles.editButton}>
                        <FaPen /> {/* Edit icon (pen) */}
                    </button>
                    <button onClick={() => onDelete(id)} className={styles.deleteButton}>
                        <FaTrashAlt /> {/* Delete icon (trash can) */}
                    </button>
                    <button className={styles.toggleButton} onClick={toggleExpand}>
                        {isExpanded ? '▲' : '▼'}
                    </button>
                </div>

                <div className={styles.headerContent}>
                    <h2 className={styles.courseName}>{name}</h2>
                    <p className={styles.courseSchedule}>{schedule}</p>
                    <p className={styles.courseTerm}>{term}</p>
                    <p className={styles.courseDescription}>{description}</p>
                </div>
            </div>

            {/* Card Body - Conditionally Rendered */}
            {isExpanded && (
                <div className={styles.mainSection}>
                    {/* Assignments Section */}
                    <div className={styles.assignments}>
                        <h3>Assignments</h3>
                        <ul>
                            {assignments.length > 0 ? (
                                assignments.map((assignment, index) => (
                                    <li key={index}>{assignment}</li>
                                ))
                            ) : (
                                <p>No assignments yet.</p>
                            )}
                        </ul>
                    </div>

                    {/* Study Plans Section */}
                    <div className={styles.studyPlans}>
                        <h3>Study Plans</h3>
                        <ul>
                            {studyPlans.length > 0 ? (
                                studyPlans.map((plan, index) => (
                                    <li key={index}>{plan}</li>
                                ))
                            ) : (
                                <p>No study plans yet.</p>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
