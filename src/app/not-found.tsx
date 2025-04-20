import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        404 - Страница не найдена
      </h1>
      <p className={styles.description}>
        Извините, запрашиваемая страница не существует.
      </p>
      <Link 
        href="/" 
        className={styles.button}
      >
        Вернуться на главную
      </Link>
    </div>
  );
}