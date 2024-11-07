import CourseCard from './courseCard';

import styles from '@/styles/courseList.module.css';

export default function CourseList({ courses }) {
    return (
        <div className={styles.gridContainer}>
            {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
            ))}
        </div>
    );
}