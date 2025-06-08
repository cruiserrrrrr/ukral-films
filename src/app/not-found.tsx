'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './not-found.module.scss';

const jokes = [
  "404: Фильм не найден. Он настолько хорошо скрылся, что даже наши лучшие детективы не могут его найти.",
  "Эта страница сбежала на съемки нового фильма. Премьера в кинотеатрах 'Никогда'.",
  "Страница исчезла быстрее, чем спойлеры к новому сезону вашего любимого сериала.",
  "Ой! Эта страница ушла на обед и забыла вернуться.",
  "Эта страница как хороший фильм ужасов – все о ней слышали, но никто её не видел."
];

export default function NotFound() {
  const [joke, setJoke] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Выбираем случайную шутку
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    setJoke(randomJoke);
    
    // Запускаем анимацию после монтирования компонента
    setTimeout(() => {
      setHasAnimated(true);
    }, 100);
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.content} ${hasAnimated ? styles.animated : ''}`}>
        <div className={styles.errorCode}>
          <span className={styles.digit}>4</span>
          <span className={styles.digit}>0</span>
          <span className={styles.digit}>4</span>
        </div>
        
        <h1 className={styles.title}>Страница не найдена</h1>
        
        <p className={styles.joke}>{joke}</p>
        
        <div className={styles.actions}>
          <Link href="/" className={styles.button}>
            Вернуться на главную
          </Link>
          <Link href="/films" className={styles.button}>
            Смотреть фильмы
          </Link>
        </div>
      </div>
    </div>
  );
}