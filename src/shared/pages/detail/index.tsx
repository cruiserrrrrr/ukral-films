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
          <p>{card.description}</p>
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