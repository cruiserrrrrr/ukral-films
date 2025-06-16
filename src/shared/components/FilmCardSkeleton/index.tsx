"use client";
import styles from "./index.module.scss";
import { Badge } from "@mantine/core";

interface IFilmCardSkeletonProps {
  count?: number;
}

const FilmCardSkeleton = ({ count = 6 }: IFilmCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div className={styles.card} key={`skeleton-${index}`}>
          <div className={styles.shimmer_container}>
            <div className={styles.shimmer}></div>
          </div>
          
          {/* Скелетон для рейтинга */}
          <div className={styles.rating}>
            <Badge color="gray" variant="filled" size="md" className={styles.skeleton_badge}>
              0.0
            </Badge>
          </div>
          
          {/* Скелетон для возрастного ограничения */}
          <div className={styles.age_restriction}>
            <Badge color="gray" variant="filled" size="sm" className={styles.skeleton_badge}>
              18+
            </Badge>
          </div>
          
          <div className={styles.info}>
            <div className={styles.name_skeleton}></div>
            
            <div className={styles.genres}>
              <Badge color="gray" variant="light" size="xs" className={`${styles.genre_badge} ${styles.skeleton_badge}`}>
                жанр
              </Badge>
              <Badge color="gray" variant="light" size="xs" className={`${styles.genre_badge} ${styles.skeleton_badge}`}>
                жанр
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FilmCardSkeleton;