import React from 'react';

import { FaEllipsisH } from "react-icons/fa";

import styles from '@/styles/assignmentsTable.module.css'

const AssignmentsTable = ({ assignments, filterCondition, onEdit, onView }) => {
  const filteredAssignments = assignments.filter(filterCondition);

  return (
    <div className={styles.tableSection}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Title</th>
            <th className={styles.th}>Type</th>
            <th className={styles.th}>Score</th>
            <th className={styles.th}>Due Date</th>
            <th className={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment, index) => (
              <tr key={index} className={styles.tr}>
                <td className={styles.td} onClick={() => onView(assignment)}>{assignment.title}</td>
                <td className={styles.td} onClick={() => onView(assignment)}>{assignment.type}</td>
                <td className={styles.td} onClick={() => onView(assignment)}>{assignment.score}</td>
                <td className={styles.td} onClick={() => onView(assignment)}>{new Date(assignment.dueAt).toLocaleString()}</td>
                <td className={`${styles.td} ${styles.tdButton}`}>
                  <button onClick={() => onEdit(assignment)} className={styles.ellipsisButton}>
                    <FaEllipsisH /> {/* Edit icon (ellipsis) */}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className={`${styles.tr} ${styles.noData}`}>
              <td colSpan="5" className={styles.td}>No assignments available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentsTable;