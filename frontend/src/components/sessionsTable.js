import { FaEllipsisH } from "react-icons/fa";

import styles from '@/styles/sessionsTable.module.css'

const SessionsTable = ({ sessions, onEdit }) => {  

  return (
    <div className={styles.tableSection}>
      <table className={styles.table}>
          <thead>
          <tr className={styles.tr}>
              <th className={styles.th}>Title</th>
              <th className={styles.th}>Started At</th>
              <th className={styles.th}>Ended At</th>
              <th className={styles.th}>Total Pause (Minutes)</th>
              <th className={styles.th}></th>
          </tr>
          </thead>
          <tbody>
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <tr key={session.id} className={styles.tr}>
                  <td className={styles.td}>{session.title}</td>
                  <td className={styles.td}>{new Date(session.startedAt).toLocaleString()}</td>
                  <td className={styles.td}>{new Date(session.endedAt).toLocaleString()}</td>
                  <td className={styles.td}>{session.pauseTime}</td>
                  <td className={styles.td}>
                    <button onClick={() => onEdit(session)} className={styles.ellipsisButton}>
                      <FaEllipsisH />
                    </button>
                  </td>
              </tr>
              ))
          ) : (
              <tr className={styles.noData}>
                <td className={`${styles.td} ${styles.noData}`} colSpan="5">
                    No sessions available.
                </td>
              </tr>
          )}
          </tbody>
      </table>
    </div>
  )

};

export default SessionsTable;