import { useState } from 'react';
import SessionCard from "./sessionCard";

import styles from '@/styles/sessionList.module.css';

export default function SessionList({ sessions }) {
  const [filter, setFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");

  // Filter sessions
  const filteredSessions = sessions.filter((session) => {
    const matchesFilter = session.title.toLowerCase().includes(filter.toLowerCase());
    const matchesCourse = courseFilter === "all" || session.course === courseFilter;
    return matchesFilter && matchesCourse;
  });

  return (
    <div className={styles.container}>
      {/* Filters */}
      <div  className={styles.filters}>
        <input
          type="text"
          placeholder="Search sessions by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.input}
        />

        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className={styles.select}
        >
          <option value="all">All Courses</option>
          {[...new Set(sessions.map((s) => s.course))].map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>


      {/* Render Session Cards */}
      <div className={styles.list}>
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session, index) => (
            <SessionCard
              key={index}
              title={session.title}
              course={session.course}
              date={session.date}
              duration={session.duration}
            />
          ))
        ) : (
          <p>No sessions match your filters.</p>
        )}
      </div>
      
    </div>
  );
};