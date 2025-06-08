"use client";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import noPhoto from "@public/images/no_photo.png";
import { getPosterUrl } from "@/services/utils/filmAdapter";
import { Text } from "@mantine/core";
import { DynamicIcon } from "lucide-react/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { removeMovie } from "@/services/redux/slices/history/history";

interface IFilmCard {
  card: ISearchElem;
  isHistory?: boolean;
}

const FilmCard = (props: IFilmCard) => {
  const { card, isHistory = false } = props;
  const posterUrl = getPosterUrl(card);
  const dispatch = useDispatch();
  
  const handleDeleteMovie = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(removeMovie(card));
  };
  
  if (!posterUrl) return null;
  return (
    <Link href={`/detail/${card.id}`} className={styles.card}>
      <Image
        className={styles.poster}
        src={posterUrl || noPhoto}
        alt={`Image for ${card.title.original}`}
        width={250}
        height={250}
        unoptimized={true}
      />
      <div className={styles.no_photo}>
        <Text size={"lg"}>Картинки сломались, пока без них 🤡</Text>
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{card.title.russian || card.title.original || ""}</p>
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