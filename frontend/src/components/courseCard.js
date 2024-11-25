import { useState } from 'react';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { IoMdAddCircleOutline } from "react-icons/io";

import AssignmentsTable from '@/components/assignmentsTable';

import styles from '@/styles/courseCard.module.css';

export default function CourseCard({ course, onEdit, onDelete, onCreateAss, onEditAss, onViewAss }) {
    const { id, name, description, schedule, term, assignments, studyPlans } = course;
    const [isExpanded, setIsExpanded] = useState(false);
    const [filter, setFilter] = useState('all');  // 'all', 'upcoming', or 'past'

    const getFilterCondition = () => {
        if (filter === 'upcoming') {
          return (assignment) => new Date(assignment.dueAt) > new Date();
        } else if (filter === 'past') {
          return (assignment) => new Date(assignment.dueAt) < new Date();
        }
        return () => true;  // 'all' - no filter
    };

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
                    <div style={{display: 'flex'}}>
                        <p className={styles.courseSchedule}>{schedule}</p>
                        <p className={styles.courseTerm}>{term}</p>
                    </div>
                    <p className={styles.courseDescription}>{description}</p>
                </div>
            </div>

            {/* Card Body - Conditionally Rendered */}
            {isExpanded && (
                <div className={styles.mainSection}>
                    {/* Assignments Section */}
                    <div className={styles.assignments}>
                        
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <h3 className={styles.subtitle}>Assignments</h3>
                            <button onClick={onCreateAss} className={styles.addAssignmentButton}>
                                <IoMdAddCircleOutline />
                            </button>
                        </div>                     

                        {/* Filter Buttons */}
                        <div className={styles.filterButtons}>
                            <button className={styles.button} onClick={() => setFilter('all')}>All</button>
                            <button className={styles.button} onClick={() => setFilter('upcoming')}>Upcoming</button>
                            <button className={styles.button} onClick={() => setFilter('past')}>Past</button>
                        </div>

                        <AssignmentsTable
                            assignments={assignments}
                            title={`${filter.charAt(0).toUpperCase() + filter.slice(1)} Assignments`}
                            filterCondition={getFilterCondition()}
                            onEdit={onEditAss}
                            onView={onViewAss}
                        />
                    </div>

                    {/* Study Plans Section */}
                    <div className={styles.studyPlans}>
                        <h3 className={styles.subtitle}>Study Plans</h3>
                        <ul>
                            {studyPlans.length > 0 ? (
                            studyPlans.map((plan, index) => (
                                <li key={index}>
                                    <div className={styles.planSnippet}>
                                        <h4 className={styles.planName}>{plan.name}</h4>
                                        <p className={`${styles["planStatus"]} ${plan.completed ? styles.completed : styles["notCompleted"]}`}>
                                            Status: {plan.completed ? 'Completed' : 'Not Completed'}
                                        </p>

                                    </div>
                                </li>
                            ))
                            ) : (
                            <p className={styles.noPlans}>No study plans yet.</p>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
