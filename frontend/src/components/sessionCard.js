import styles from '@/styles/sessionCard.module.css';

export default function SessionCard({ title, plan, date, duration }) {
  return (
    <div className={styles.card}>
      <strong className={styles.cardTitle}>{title}</strong>
      <p className={styles.cardContent}>Plan: {plan}</p>
      <p className={styles.cardContent}>Date: {date}</p>
      <p className={styles.cardContent}>Duration: {duration} minutes</p>
    </div>
  );
}
