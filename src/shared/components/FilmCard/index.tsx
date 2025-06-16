"use client";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import noPhoto from "@public/images/no_photo.png";
import { getPosterUrl } from "@/services/utils/filmAdapter";
import { Badge, Text } from "@mantine/core";
import { DynamicIcon } from "lucide-react/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { removeMovie } from "@/services/redux/slices/history/history";
import { useState } from "react";

interface IFilmCard {
  card: ISearchElem;
  isHistory?: boolean;
}

const FilmCard = (props: IFilmCard) => {
  const { card, isHistory = false } = props;
  const posterUrl = getPosterUrl(card);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  
  const handleDeleteMovie = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(removeMovie(card));
  };
  
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  const kinopoiskRating = card.rating?.kinopoisk?.value;
  
  const ageRestriction = card.restriction?.age;
  
  const genres = card.genres?.slice(0, 2).map(genre => genre.name) || [];
  
  const getRatingColor = (rating: number | null) => {
    if (!rating) return "gray";
    if (rating >= 7.5) return "green";
    if (rating >= 6) return "yellow";
    return "red";
  };
  
  if (!posterUrl) return null;
  
  return (
    <Link href={`/detail/${card.id}`} className={styles.card}>
      {isLoading && (
        <div className={styles.shimmer_container}>
          <div className={styles.shimmer}></div>
        </div>
      )}
      <Image
        className={`${styles.poster} ${isLoading ? styles.hidden : ""}`}
        src={posterUrl || noPhoto}
        alt={`Image for ${card.title.original}`}
        width={250}
        height={250}
        unoptimized={true}
        onLoad={handleImageLoad}
      />
      {/*<div className={styles.no_photo}>*/}
      {/*  <Text size={"lg"}>Картинки сломались, пока без них 🤡</Text>*/}
      {/*</div>*/}
      
      {ageRestriction && (
        <div className={styles.age_restriction}>
          <Badge color="grape" variant="filled" size="sm">{ageRestriction}+</Badge>
        </div>
      )}
      
      {/* Бейдж с рейтингом */}
      {kinopoiskRating && (
        <div className={styles.rating}>
          <Badge color={getRatingColor(kinopoiskRating)} variant="filled" size="md">
            {kinopoiskRating.toFixed(1)}
          </Badge>
        </div>
      )}
      
      <div className={styles.info}>
        <p className={styles.name}>{card.title.russian || card.title.original || ""}</p>
        
        {/* Жанры */}
        {genres.length > 0 && (
          <div className={styles.genres}>
            {genres.map((genre, index) => (
              <Badge key={index} color="violet" variant="light" size="xs" className={styles.genre_badge}>
                {genre}
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      {isHistory ? (
        <button className={styles.remove} onClick={handleDeleteMovie}>
          <DynamicIcon name={"x"} width={16} height={16} className={styles.icon} />
        </button>
      ) : null}
    </Link>
  );
};

export default FilmCard;