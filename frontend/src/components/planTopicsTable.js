import { FaEllipsisH } from "react-icons/fa";

import styles from '@/styles/planTopicsTable.module.css'

const PlanTopicsTable = ({ topics, onEdit}) => {
  return (
    <div className={styles.tableSection}>
      <table className={styles.table}>
          <thead>
          <tr className={styles.tr}>
              <th className={styles.th}>Topic Name</th>
              <th className={styles.th}>Completed?</th>
              <th className={styles.th}>Notes</th>
              <th className={styles.th}></th>
          </tr>
          </thead>
          <tbody>
          {topics.length > 0 ? (
              topics.map((topic) => (
              <tr key={topic.id} className={styles.tr}>
                  <td className={styles.td}>{topic.name}</td>
                  <td className={styles.td}>
                      <label className={styles.checkboxCell}>
                          <input
                          type="checkbox"
                          checked={topic.completed}
                          onChange={() => handleCompletionToggle(topic.id)} // Update completion status
                          className={styles.checkbox}
                          />
                      </label>
                  </td>
                  <td className={styles.td}>{topic.notes}</td>
                  <td className={styles.td}>
                    <button onClick={() => onEdit(topic)} className={styles.ellipsisButton}>
                      <FaEllipsisH />
                    </button>
                  </td>
              </tr>
              ))
          ) : (
              <tr className={styles.noData}>
              <td className={`${styles.td} ${styles.noData}`} colSpan="4">
                  No topics available.
              </td>
              </tr>
          )}
          </tbody>
      </table>
    </div>
  )

};

export default PlanTopicsTable;