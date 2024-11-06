import styles from '@/styles/courseCard.module.css';

export default function CourseCard({ name, schedule, room, assignments, studyPlans }) {
    return (
        <div className={styles.courseCard}>
            <div className={styles.cardHeader}>
                <h2 className={styles.courseName}>{name}</h2>
                <p className={styles.courseSchedule}>{schedule}</p>
                <p className={styles.courseRoom}>{room}</p>
            </div>
            <div className={styles.mainSection}>
                <div className={styles.assignments}>
                    <h3>Assignments</h3>
                    <ul>
                        {assignments.map((assignment, index) => (
                            <li key={index}>{assignment}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.studyPlans}>
                    <h3>Study Plans</h3>
                    <ul>
                        {studyPlans.map((plan, index) => (
                            <li key={index}>{plan}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
