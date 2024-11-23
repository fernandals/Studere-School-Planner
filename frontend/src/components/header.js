import styles from '@/styles/header.module.css';

export default function Header({ title, buttonText, onButtonClick }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>{title}</h1>
      {buttonText && onButtonClick && (
        <button className={styles.header__button} onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </header>
  );
}
