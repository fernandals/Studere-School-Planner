import styles from '@/styles/sessionCard.module.css';

export default function TermCard({ name, startDate, endDate }) {
  return (
    <div className={styles.card}>
      <strong className={styles.cardTitle}>{name}</strong>
      <p className={styles.cardContent}>Start Date: {startDate}</p>
      <p className={styles.cardContent}>End Date: {endDate}</p>
    </div>
  );
}
