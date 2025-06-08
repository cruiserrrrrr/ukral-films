"use client";

import styles from "./index.module.scss";
import Image from "next/image";
import { notFound } from "next/navigation";
import Player from "@/shared/components/player";
import FilmsList from "@/shared/components/FilmsList";
import { Title } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addMovie } from "@/services/redux/slices/history/history";
import { getPosterUrl } from "@/services/utils/filmAdapter";

interface IDetail {
  card: ISearchElem;
  subCards: ISearchElem[];
}

const Detail = (props: IDetail) => {
  const { card, subCards } = props;
  const dispatch = useDispatch();
  const posterUrl = getPosterUrl(card);
  
  useEffect(() => {
    dispatch(addMovie(card));
  }, []);
  
  if (!card) return notFound();
  
  // Форматирование списка жанров в строку
  const genresList = card.genres?.map(genre => genre.name).join(", ");
  
  // Форматирование списка стран в строку
  const countriesList = card.countries?.map(country => country.name).join(", ");
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={card.title.original}
            width={1000}
            height={1000}
            className={styles.poster}
          />
        ) : null}
        <div className={styles.info}>
          <h1 className={styles.title}>{card.title.original}</h1>
          {card.title.russian && card.title.russian !== card.title.original && (
            <h2 className={styles.russianTitle}>{card.title.russian}</h2>
          )}
          
          <div className={styles.metaInfo}>
            {card.year && <div className={styles.metaItem}><span className={styles.metaLabel}>Год:</span> {card.year}</div>}
            {genresList && <div className={styles.metaItem}><span className={styles.metaLabel}>Жанр:</span> {genresList}</div>}
            {countriesList && <div className={styles.metaItem}><span className={styles.metaLabel}>Страна:</span> {countriesList}</div>}
            {card.duration && <div className={styles.metaItem}><span className={styles.metaLabel}>Продолжительность:</span> {card.duration} мин</div>}
            {card.restriction?.age && <div className={styles.metaItem}><span className={styles.metaLabel}>Возраст:</span> {card.restriction.age}</div>}
          </div>
          
          <div className={styles.ratings}>
            {card.rating?.kinopoisk?.value && (
              <div className={styles.ratingItem}>
                <div className={styles.ratingValue}>{card.rating.kinopoisk.value.toFixed(1)}</div>
                <div className={styles.ratingSource}>Кинопоиск</div>
                {card.rating.kinopoisk.count && <div className={styles.ratingCount}>{card.rating.kinopoisk.count} оценок</div>}
              </div>
            )}
            
            {card.rating?.imdb?.value && (
              <div className={styles.ratingItem}>
                <div className={styles.ratingValue}>{card.rating.imdb.value.toFixed(1)}</div>
                <div className={styles.ratingSource}>IMDb</div>
                {card.rating.imdb.count && <div className={styles.ratingCount}>{card.rating.imdb.count} оценок</div>}
              </div>
            )}
          </div>
          
          {card.tagline && (
            <div className={styles.tagline}>«{card.tagline}»</div>
          )}
          
          {card.description && (
            <div className={styles.description}>
              <h3 className={styles.sectionTitle}>Описание</h3>
              <p>{card.description}</p>
            </div>
          )}
          
          {card.synopsis && card.synopsis !== card.description && (
            <div className={styles.synopsis}>
              <h3 className={styles.sectionTitle}>Сюжет</h3>
              <p>{card.synopsis}</p>
            </div>
          )}
        </div>
      </div>
      <Player id={card.id} />
      {subCards && subCards.length > 0 ? (
        <>
          <Title order={2}>Похожее</Title>
          <FilmsList films={subCards} />
        </>
      ) : null}
    </div>
  );
};

export default Detail;