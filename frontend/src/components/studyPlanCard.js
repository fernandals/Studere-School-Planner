import { IoMdAddCircleOutline } from "react-icons/io";
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

import PlanTopicsTable from '@/components/planTopicsTable'
import SessionsTable from '@/components/sessionsTable'

import styles from '@/styles/studyPlanCard.module.css';

export default function StudyPlanCard({ plan, onEdit, createTopic, editTopic, createSession, editSession }) {
    const { id, name, completed, studyTopics, studySessions } = plan;
    
    return (
        <div
            className={`${styles.planCard} ${
                completed ? styles.completed : ''
            }`}
        >
            <div className={styles.cardHeader}>
                <div className={styles.headerContent}>
                    <h2 className={styles.planName}>{name}</h2>

                    <div className={styles.actions}>
                        <button onClick={() => onEdit(plan)} className={styles.editButton}>
                            <FaPen /> 
                        </button>
                        <button onClick={() => onDelete(id)} className={styles.deleteButton}>
                            <FaTrashAlt /> 
                        </button>
                    </div>
                </div>
                
                <div className={styles.completionForm}>
                    <div 
                        className={`${styles.iconWrapper} ${completed ? styles.completed : ''}`} 
                        onClick={() => markAsCompleted(plan.id)} 
                        role="button"
                        title={completed ? 'Unmark as completed' : 'Mark as completed'}
                    >
                        {completed ? (
                        <MdOutlineCheckBox className={styles.icon} />
                        ) : (
                        <MdOutlineCheckBoxOutlineBlank className={styles.icon} />
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.mainSection}>
                <div className={styles.studyTopics}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <h3 className={styles.subtitle}>Study Topics</h3>
                        <button className={styles.addButton} onClick={createTopic}>
                            <IoMdAddCircleOutline />
                        </button>
                    </div>

                    {/* it would be nice to add some filters but nah */}
                    <PlanTopicsTable
                        topics={studyTopics}
                        onEdit={editTopic}
                    />
                </div>
             
                <div className={styles.studySessions}>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                        <h3 className={styles.subtitle}>Study Sessions</h3>
                        <button className={styles.addButton} onClick={createSession}>
                            <IoMdAddCircleOutline />
                        </button>
                    </div>

                    <SessionsTable
                        sessions={studySessions}
                        onEdit={editSession}
                    />
                </div>
            </div>
        </div>
    );
}
