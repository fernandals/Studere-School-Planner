import StudyPlanCard from './studyPlanCard';

import styles from '@/styles/studyPlanList.module.css';

export default function StudyPlanList({ plans, onEdit, createTopic, editTopic, createSession, editSession /*onDelete*/ }) {
    return (
      <div className={styles.gridContainer}>
        {plans.length > 0 ? (
            plans.map((plan) => (
                <StudyPlanCard
                    key={plan.id}
                    plan={plan}
                    onEdit={onEdit}
                    createTopic={createTopic}
                    editTopic={editTopic}
                    createSession={createSession}
                    editSession={editSession}
                />
            ))
        ) : (
            <p className={styles.noPlansMessage}>
                No study plans available. Start by creating a new one!
            </p>
        )}
      </div>
    );
}
