import CourseCard from './courseCard';

import styles from '@/styles/courseList.module.css';

export default function CourseList({ courses }) {
    
    const handleEdit = (id) => {
        console.log('Edit course with id:', id);
    };

    const handleDelete = (id) => {
        setCourses(courses.filter(course => course.id !== id));
    };

    return (
        <div className={styles.gridContainer}>
            {courses.map((course) => (
                <CourseCard 
                    key={course.id}
                    course={course}
                    onEdit={handleEdit}
                    onDelete={handleDelete} />
            ))}
        </div>
    );
}
