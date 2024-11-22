import { useState } from 'react';
import SessionCard from "./sessionCard";

import styles from '@/styles/sessionList.module.css';

export default function SessionList({ sessions }) {
  const [filter, setFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("all");

  // Filter sessions
  const filteredSessions = sessions.filter((session) => {
    const matchesFilter = session.title.toLowerCase().includes(filter.toLowerCase());
    const matchesPlan = planFilter === "all" || session.plan === planFilter;
    return matchesFilter && matchesPlan;
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
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
          className={styles.select}
        >
          <option value="all">All Plans</option>
          {[...new Set(sessions.map((s) => s.plan))].map((plan, index) => (
            <option key={index} value={plan}>
              {plan}
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
              plan={session.plan}
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